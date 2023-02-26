import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization.split(' ');
      const [bearer, token] = authHeader;

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User not autorized');
      }

      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (e) {
      throw new UnauthorizedException('User not autorized');
    }
  }
}
