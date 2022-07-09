import { Injectable } from '@nestjs/common';
import { BaseGameService } from '../base/base.service';
import { IGamePlayer } from '../types';

@Injectable()
export class MultiplayerService {
  private games = [];
  // changeWord(word) {}
  guess(player: IGamePlayer, word: string) {
    const game = this.games.find((item) => item.player.id === player.id);
    if (!game) {
      return {
        error: 'invalid player',
      };
    }
    return game.guess(word);
  }
}
