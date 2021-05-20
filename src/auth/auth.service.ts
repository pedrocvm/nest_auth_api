import { HttpException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from 'user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password?: string) {
    const user = await this.userService.findByEmail(email);

    const validPasssword = compareSync(password, user.password);

    if (!validPasssword) {
      throw new HttpException('Incorrect password', 401);
    }

    return user;
  }

  async me(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException('User not found', 401);
    }

    return user;
  }
}
