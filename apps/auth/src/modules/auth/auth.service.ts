import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { IUser } from '@app/common-modules';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService,
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

  async register(dto: CreateAuthDto) {
    if (dto.confirmPassword !== dto.password) {
      throw new Error('invalid password');
    }
    const user = await this.authRepo
      .create({
        username: dto.username,
        password: dto.password,
      })
      .save();
    return await this.login({ id: user.id, username: user.username });
  }

  async login(user: IUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
