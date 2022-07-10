import { IUser } from '@app/common-modules';
import { JwtRefreshTokenGuard } from '@app/common-modules/middlewares/guards/jwt-refresh-token.guard';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Response,
  Get,
} from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { LocalAuthGuard } from '../../middlewares/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.authService.login(req.user, res);
  }

  @Post('register')
  async register(
    @Body() dto: CreateAuthDto,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.authService.register(dto, res);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('session')
  getCurrentSesion(@Request() req: ExpressRequest) {
    return this.authService.refreshAccessToken(<IUser>req.user);
  }

  @Get('log-out')
  logOut(@Response({ passthrough: true }) res: ExpressResponse) {
    return this.authService.logOut(res);
  }
}
