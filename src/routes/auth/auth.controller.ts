import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthResponse, AuthUserDto, RefreshTokenDto } from './dto/auth.dto';

@ApiTags('Authorization')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiResponse({ status: 400, description: 'Required fields missing' })
  async signup(@Body() userDto: AuthUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Success', type: AuthResponse })
  @ApiResponse({ status: 400, description: 'Required fields missing' })
  @ApiResponse({ status: 403, description: 'Authentication failed' })
  async login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get new acess token' })
  @ApiResponse({ status: 200, description: 'Success', type: AuthResponse })
  @ApiResponse({ status: 401, description: 'No refresh token' })
  @ApiResponse({ status: 403, description: 'Token is invalid or expired' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }
}
