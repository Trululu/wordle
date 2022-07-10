import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameWordleModule } from '@app/game';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { PassportModule } from '@nestjs/passport';
import { RedisCacheModule } from '@app/common-modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from '../dictionary/entities/dictionary.entity';
import { Game } from './entities/game.entity';

@Module({
  imports: [
    PassportModule,
    GameWordleModule,
    DictionaryModule,
    RedisCacheModule.create('redis.cache'),
    TypeOrmModule.forFeature([Dictionary, Game]),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
