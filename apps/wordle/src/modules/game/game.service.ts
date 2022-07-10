import { IUser } from '@app/common-modules';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import Redis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { Repository } from 'typeorm';
import { DictionaryService } from '../dictionary/dictionary.service';
import { lang } from '../dictionary/types';
import { GuestDto } from './dto/guess.dto';
import { Game } from './entities/game.entity';
import { IGame } from './types';

@Injectable({ scope: Scope.REQUEST })
export class GameService {
  private maxAttempts = 5;
  private redis: Redis;
  constructor(
    private dictionaryService: DictionaryService,
    @Inject(REQUEST) private readonly request: Request,
    private readonly redisService: RedisService,
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,
  ) {
    this.redis = this.redisService.getClient();
  }

  async guess(dto: GuestDto) {
    const user = <IUser>this.request.user;
    const key = user.id + dto.lang;
    let game: IGame = JSON.parse(await this.redis.get(key));
    if (!game) {
      game = await this.createGame(dto.lang, user);
      await this.redis.set(key, JSON.stringify(game), 'EX', 300);
    }
    const time = await this.getTtl(key);
    if (game.win) {
      return {
        success: true,
        message: `wait ${time} until the next word`,
        win: game.win,
      };
    }
    if (game.attempts === this.maxAttempts) {
      return {
        success: true,
        message: `you lost, wait ${time} until the next word`,
        win: game.win,
      };
    }
    const response = this.logic(dto.word, game.word.word);
    await this.redis.set(
      key,
      JSON.stringify({ ...game, attempts: game.attempts + 1 }),
      'EX',
      time,
    );
    if (game.attempts + 1 === this.maxAttempts || game.win) {
      await this.gameRepo
        .create({
          attempts: game.attempts,
          user_id: user.id,
          word_id: game.word.id,
          win: game.win,
        })
        .save();
      return response;
    }
    return response;
  }

  private async getTtl(key: string): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { promisify } = require('util');
    const ttl = promisify(this.redis.ttl).bind(this.redis);
    return await ttl(key);
  }

  private async createGame(lang: lang, user: IUser) {
    const word = await this.dictionaryService.getWord(lang);
    return {
      attempts: 0,
      word,
      user,
      win: false,
    };
  }

  private logic(userWord: string, word: string) {
    const response = [];
    let correctLetters = 0;
    for (let index = 0; index < word.length; index++) {
      const letter = word[index];
      if (userWord.includes(letter)) {
        if (userWord[index] == letter) {
          correctLetters++;
          response.push({ letter, value: 1 });
        } else {
          response.push({ letter, value: 2 });
        }
      } else {
        response.push({ letter, value: 3 });
      }
    }
    return { response, win: correctLetters === 5 };
  }
}
