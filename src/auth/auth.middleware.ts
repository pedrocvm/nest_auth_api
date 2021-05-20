import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];

      try {
        const decoded: any = jwt.verify(token, jwtConstants.secret);
        let user = undefined;

        user = await this.userService.findById(decoded.sub);

        req['access-token'] = user;
        next();
      } catch (error) {
        throw new HttpException('Not Authorized', 401);
      }
    } else {
      throw new HttpException('Token invalid or not provided', 401);
    }
  }
}
