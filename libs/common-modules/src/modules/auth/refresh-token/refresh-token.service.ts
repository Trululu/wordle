import { IUser } from '@app/common-modules';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class RefreshTokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async sign(user: IUser | any, res: Response) {
    res.cookie(
      'jwt-refresh-token',
      this.jwtService.sign(user, {
        privateKey: this.config.get('auth.refresh_token').privateKey,
        algorithm: this.config.get('auth.refresh_token').signOptions.algorithm,
        expiresIn: this.config.get('auth.refresh_token').signOptions.expiresIn,
      }),
      {
        httpOnly: true,
      },
    );
  }
}
