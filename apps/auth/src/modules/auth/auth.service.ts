import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import {
  AccessTokenService,
  IUser,
  RefreshTokenService,
} from '@app/common-modules';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authRepo.findOneBy({ username });
    const validPassword = compareSync(pass, user.password);
    if (!validPassword) {
      return null;
    }
    this.logger.log(`user login ${user.id}`);
    return {
      id: user.id,
      username: user.username,
    };
  }

  async register(dto: CreateAuthDto, res: Response) {
    if (dto.confirmPassword !== dto.password) {
      throw new Error('invalid password');
    }
    const user = await this.authRepo
      .create({
        username: dto.username,
        password: dto.password,
      })
      .save();

    return this.sendTokens({ id: user.id, username: user.username }, res);
  }

  async refreshAccessToken(user: IUser) {
    const storedUser = await this.authRepo.findOneBy({ id: user.id });
    return {
      access_token: await this.accessTokenService.sign({
        id: storedUser.id,
        username: storedUser.username,
      }),
    };
  }

  async login(user: IUser, res: Response) {
    return await this.sendTokens(user, res);
  }

  async logOut(res: Response) {
    res.cookie('jwt-refresh-token', '', {
      httpOnly: true,
    });

    return { access_token: '' };
  }

  async sendTokens(user: IUser | any, res: Response) {
    await this.refreshTokenService.sign(user, res);
    return {
      access_token: await this.accessTokenService.sign(user),
    };
  }
}
