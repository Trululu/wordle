import { Module } from '@nestjs/common';
import {
  HealthCheckModule,
  TypeormConnectionModule,
  RedisModule,
  AuthStrategyModule,
} from '@app/common-modules';
import { AppConfigModule } from './config/index.module';
import { GameModule } from './modules/game/game.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';

@Module({
  imports: [
    HealthCheckModule,
    AppConfigModule,
    TypeormConnectionModule.create('database.main'),
    GameModule,
    DictionaryModule,
    RedisModule.create('redis.url'),
    AuthStrategyModule,
  ],
})
export class AppModule {}
