import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameWordleModule } from '@app/game';

@Module({
  imports: [GameWordleModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
