import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from './auth.body-interface';

@Injectable() // Provider
export class AuthGuard implements CanActivate {
  // ^ CanActive Interface
  // 생성자
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (request.cookies['login']) {
      return true;
    }

    const { email, password } = request.body;
    if (!email || !password) {
      return false;
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
