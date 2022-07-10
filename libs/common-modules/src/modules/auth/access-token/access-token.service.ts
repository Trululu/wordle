import { IUser } from '@app/common-modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async sign(user: IUser) {
    return this.jwtService.sign(user, {
      privateKey: this.config.get('auth.access_token').privateKey,
      algorithm: this.config.get('auth.access_token').signOptions.algorithm,
      expiresIn: this.config.get('auth.access_token').signOptions.expiresIn,
    });
  }
}
