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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { LocalAuthGuard } from '../../middlewares/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginAuthDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Login user',
    type: LoginResponseDto,
  })
  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @Request() req,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.authService.login(req.user, res);
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Register a user',
    type: LoginResponseDto,
  })
  async register(
    @Body() dto: RegisterAuthDto,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    return this.authService.register(dto, res);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('session')
  @ApiResponse({
    status: 201,
    description: 'Get a new access token',
    type: LoginResponseDto,
  })
  getCurrentSesion(@Request() req: ExpressRequest) {
    return this.authService.refreshAccessToken(<IUser>req.user);
  }

  @Get('log-out')
  @ApiResponse({
    status: 201,
    description: 'destroys the session',
    type: LoginResponseDto,
  })
  logOut(@Response({ passthrough: true }) res: ExpressResponse) {
    return this.authService.logOut(res);
  }
}
