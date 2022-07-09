import { Module } from '@nestjs/common';
import {
  HealthCheckModule,
  TypeormConnectionModule,
} from '@app/common-modules';
import { AppConfigModule } from './config/index.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    HealthCheckModule,
    AppConfigModule,
    TypeormConnectionModule.create('database.main'),
    GameModule,
  ],
})
export class AppModule {}
