import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './config/index.module';

@Module({
  imports: [AppConfigModule, UserModule, AuthModule],
})
export class MainModule {}
