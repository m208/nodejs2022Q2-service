import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdatePasswordDto } from './dto/update-user.dto';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { User } from './user.model';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @Put(':id')
  async update(
    @Body() userDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.usersService.update(uuid, userDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.usersService.delete(uuid);
  }
}
