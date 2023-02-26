import { IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class AuthResponse {
  readonly accessToken: string;
}
