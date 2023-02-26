import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth.dto';

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

  private async generateToken(user: User) {
    const payload = {
      login: user.login,
      userId: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
