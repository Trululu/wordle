import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class AuthStrategyModule {}
