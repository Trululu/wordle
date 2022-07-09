import { JwtAuthGuard } from '@app/common-modules';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game-wordle')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  attempt() {
    return this.gameService.word('es');
  }
}
