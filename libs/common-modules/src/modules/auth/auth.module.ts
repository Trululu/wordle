import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt';
import { JwtRefreshTokenStrategy } from './strategies/refresh-token';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthStrategyModule {}
