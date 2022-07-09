import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameWordleModule } from '@app/game';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, GameWordleModule, DictionaryModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
