import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
// import { Request, Response } from 'express';
import { AuthGuard, LocalAuthGuard, AuthenticateGuard } from './auth.guard';
// import { RequestWithUser } from './auth.body-interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // 회원 가입
  async register(@Body() userDto: CreateUserDto) {
    // ^ Service 의 Validator 로 유효성 검증
    return await this.authService.register(userDto);
  }

  @Post('login') // 로그인
  async login(@Request() req, @Response() res) {
    const { email, password } = req.body;
    const userInfo = await this.authService.validateUser(email, password);

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: true, // 브라우저에서 읽기 불가
        maxAge: 1000 * 60 * 60 * 24 * 7, // 밀리 초 단위
      });
    }
    return res.send({ message: 'User logged in successfully' });
  }

  @UseGuards(AuthGuard) // AuthGuard 사용
  @Post('login-en')
  loginEn(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
    }
    return res.send({ message: 'User logged in successfully' });
  }

  @UseGuards(AuthGuard)
  @Get('guard-test')
  guardTest() {
    return 'Need to be logged in';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-session')
  loginSession(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticateGuard)
  @Get('auth-test')
  testGuardWithSession(@Request() req) {
    return req.user;
  }
}
