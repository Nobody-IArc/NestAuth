import {
  Body,
  Controller,
  Post,
  Request as ReqDec,
  Response as ResDec,
} from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // 회원 가입
  async register(@Body() userDto: CreateUserDto) {
    // ^ Service 의 Validator 로 유효성 검증
    return await this.authService.register(userDto);
  }

  @Post('login') // 로그인
  async login(@ReqDec() req: Request, @ResDec() res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    const userInfo = await this.authService.validateUser(email, password);

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: true, // 브라우저에서 읽기 불가
        maxAge: 1000 * 60 * 60 * 24 * 7, // 밀리 초 단위
      });
    }
    return res.send({ message: 'User logged in successfully' });
  }
}
