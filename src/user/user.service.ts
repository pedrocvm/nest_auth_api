import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PhoneType, UserModel, UserRoleEnum } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async findAll(userId: string): Promise<UserModel[]> {
    try {
      const user = await this.userModel.findById(userId);

      if (user.role !== UserRoleEnum.ADMIN) {
        throw new HttpException(`You don't have permission to access`, 403);
      }

      const allUsers = await this.userModel.find();

      return allUsers;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findById(id: string): Promise<UserModel> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`${id} is not a valid _ID.`, 400);
      }

      const user = await this.userModel.findById(id);

      if (!user) {
        throw new HttpException(`User not found`, 400);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
        throw new HttpException('User not found', 400);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async create(data: CreateUserDto, userId?: string): Promise<CreateUserDto> {
    try {
      const user = await this.userModel.findById(userId);

      if (userId) {
        if (user.role !== UserRoleEnum.ADMIN) {
          throw new HttpException(`You don't have permission to access`, 403);
        }
      }

      const hasUser = await this.userModel.findOne({ email: data.email });

      if (hasUser) {
        throw new HttpException('Email unavailable', 400);
      }

      data.phones.forEach((phone: PhoneType) => {
        const numberLength = phone.number.toString().length;
        const dddLength = phone.ddd.toString().length;

        if (numberLength > 9 || numberLength < 8) {
          throw new HttpException(
            'Phone Number must have the correct format. ',
            400
          );
        }

        if (dddLength !== 2) {
          throw new HttpException(
            'Phone DDD must have the correct format. ',
            400
          );
        }
      });

      const record = new this.userModel();
      record.name = data.name;
      record.email = data.email;
      record.password = hashSync(data.password, 10);
      record.role = data.role;
      record.phones = data.phones;
      record.token = await this.jwtToken(record);

      const newUser = await this.userModel.create(record);

      return newUser.save();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async update(
    id: string,
    data: UpdateUserDto,
    userId?: string
  ): Promise<UpdateUserDto> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`ID #${id} is not a valid _ID.`, 400);
      }

      const user = await this.userModel.findById(userId);

      if (userId) {
        if (userId !== id && user.role !== UserRoleEnum.ADMIN) {
          throw new HttpException(`You don't have permission to access`, 403);
        }
      }

      const userToUpdate = await this.userModel.findByIdAndUpdate(id, data);

      if (!userToUpdate) {
        throw new HttpException(`User not found`, 400);
      }

      return await this.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async delete(id: string, userId: string): Promise<{ message: string }> {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`ID #${id} is not a valid _ID.`, 400);
      }

      const user = await this.userModel.findById(userId);

      if (userId !== id && user.role !== UserRoleEnum.ADMIN) {
        throw new HttpException(`You don't have permission to access`, 403);
      }
      const userToDelete = await this.userModel.findByIdAndRemove(id);

      if (!userToDelete) {
        throw new HttpException(`User not found`, 400);
      }

      return {
        message: `User ${id} successfully deleted`
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async jwtToken(user: UserModel): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
