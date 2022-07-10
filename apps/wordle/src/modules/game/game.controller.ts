import { JwtAuthGuard } from '@app/common-modules';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameStateDto } from './dto/gameState';
import { GuestDto } from './dto/guess.dto';
import { GameSuccessDto } from './dto/success.dto';
import { GameService } from './game.service';

@ApiTags('Wordle')
@Controller('game-wordle')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiResponse({
    status: 200,
    description: 'Game wait',
    type: GameSuccessDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Game progres',
    type: GameStateDto,
  })
  @ApiResponse({ status: 404, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  attempt(@Body() dto: GuestDto) {
    return this.gameService.guess(dto);
  }
}
