import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdatePasswordDto } from './dto/update-user.dto';
import {
  Delete,
  HttpCode,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';

import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiResponse({ status: 400, description: 'Required fields missing' })
  async create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All Users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: User })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: 'User not exist' })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    const user = await this.usersService.findOne(uuid);
    return new User({ ...user });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 403, description: 'Password is invalid' })
  @ApiResponse({ status: 404, description: 'User not exist' })
  async update(
    @Body() userDto: UpdatePasswordDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.usersService.update(uuid, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 400, description: 'UUID not valid' })
  @ApiResponse({ status: 404, description: 'User not exist' })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.usersService.delete(uuid);
  }
}
