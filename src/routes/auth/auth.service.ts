import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthUserDto) {
    return await this.usersService.createUser({
      ...dto,
      password: await bcrypt.hash(dto.password, +process.env.CRYPT_SALT),
    });
  }

  async login(dto: AuthUserDto) {
    const user = await this.usersService.findOneByLogin(dto.login);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEquals) {
      return this.generateToken(user);
    }

    throw new ForbiddenException('Authentication failed');
  }

  async refresh(dto: RefreshTokenDto) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException('No refresh token presented');
    }
    try {
      const user = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      return this.generateToken(user);
    } catch (e) {
      throw new ForbiddenException('Token is invalid or expired');
    }
  }

  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
