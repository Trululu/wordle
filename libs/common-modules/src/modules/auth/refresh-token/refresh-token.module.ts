import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';

@Module({})
export class RefreshTokenModule {
  static create(param: string): DynamicModule {
    return {
      module: RefreshTokenModule,
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => config.getOrThrow(param),
        }),
      ],
      providers: [RefreshTokenService, JwtService],
      exports: [RefreshTokenService, JwtService],
    };
  }
}
