import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from 'src/types';

export class User implements IUser {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'ffcbc50b-80d8-43d0-aed4-4de49f883775',
    description: 'User id: uuid v4',
  })
  id: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User login' })
  login: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Exclude()
  password: string;

  @ApiProperty({
    example: '1',
    description: 'Integer number, increments on update',
  })
  version: number;

  @ApiProperty({
    example: '1675425790832',
    description: 'timestamp of creation',
  })
  createdAt: number;

  @ApiProperty({
    example: '1675425790832',
    description: 'timestamp of last update',
  })
  updatedAt: number;
}
