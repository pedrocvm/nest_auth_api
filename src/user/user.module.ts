import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from 'auth/constants';
import { JwtStrategy } from 'auth/jwt.strategy';
import { UserModel, UserSchema } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' }
    })
  ],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
