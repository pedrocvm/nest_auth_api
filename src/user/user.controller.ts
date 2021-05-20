import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@User('id') userId: string) {
    return await this.userService.findAll(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto, @User('id') userId?: string) {
    return await this.userService.create(data, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @User('id') userId?: string
  ) {
    return await this.userService.update(id, data, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @User('id') userId: string) {
    return await this.userService.delete(id, userId);
  }
}
