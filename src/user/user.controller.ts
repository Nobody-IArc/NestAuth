import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user') // 주소가 'user' 로 시작됨
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() user: User) {
    return await this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  }

  @Put('/update/:email')
  async updateUser(@Param('email') email: string, @Body() user: User) {
    console.log(user);
    return await this.userService.updateUser(email, user);
  }

  @Delete('/delete/:email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.deleteUser(email);
  }
}
