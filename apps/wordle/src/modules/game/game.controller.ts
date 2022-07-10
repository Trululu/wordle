import { JwtAuthGuard } from '@app/common-modules';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GuestDto } from './dto/guess.dto';
import { GameService } from './game.service';

@Controller('game-wordle')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  attempt(@Body() dto: GuestDto) {
    return this.gameService.guess(dto);
  }
}
