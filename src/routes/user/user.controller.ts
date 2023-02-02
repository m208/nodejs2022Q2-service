import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/types';
import { CreateUserDto, UpdatePasswordDto } from './dto/userDto';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Put(':id')
  async update(
    @Body() userDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.usersService.update(uuid, userDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.usersService.delete(uuid);
  }
}
