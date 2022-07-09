import { Module } from '@nestjs/common';
import { BaseGameService } from './base/base.service';
import { MultiplayerService } from './multiplayer/multiplayer.service';

@Module({
  providers: [BaseGameService, MultiplayerService],
  exports: [BaseGameService, MultiplayerService],
})
export class GameWordleModule {}
