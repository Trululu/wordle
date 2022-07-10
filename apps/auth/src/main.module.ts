import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './config/index.module';
import {
  AuthStrategyModule,
  TypeormConnectionModule,
} from '@app/common-modules';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    TypeormConnectionModule.create('database.main'),
    AuthStrategyModule,
  ],
})
export class MainModule {}
