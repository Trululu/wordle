import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenService } from './access-token.service';

@Module({})
export class AccessTokenModule {
  static create(param: string): DynamicModule {
    return {
      module: AccessTokenModule,
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => config.getOrThrow(param),
        }),
      ],
      providers: [AccessTokenService, JwtService],
      exports: [AccessTokenService, JwtService],
    };
  }
}
