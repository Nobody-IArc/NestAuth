import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // 회원 가입
  async register(@Body() userDto: CreateUserDto) {
    // ^ Service 의 Validator 로 유효성 검증
    return await this.authService.register(userDto);
  }
}
