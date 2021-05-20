import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'user/dto';
import { User } from 'user/user.decorator';
import { UserService } from 'user/user.service';
import FormatDateNow from 'utils/DateFormat';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/signin')
  public async signin(@Body() data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await this.authService.validateUser(email, password);

    delete user.password;

    return this.userService.update(user.id, {
      lastLogin: FormatDateNow()
    });
  }

  @Post('/signup')
  public async signup(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);
    delete user.password;

    return user;
  }

  @Get('/me')
  public async me(@User('id') userId: string) {
    return this.authService.me(userId);
  }
}
