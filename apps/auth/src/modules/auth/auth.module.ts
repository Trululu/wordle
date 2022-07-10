import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { AccessTokenModule, RefreshTokenModule } from '@app/common-modules';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Auth]),
    RefreshTokenModule.create('auth.refresh_token'),
    AccessTokenModule.create('auth.access_token'),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
