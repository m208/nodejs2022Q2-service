import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { IUser } from 'src/types';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User implements IUser {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 'ffcbc50b-80d8-43d0-aed4-4de49f883775',
    description: 'User id: uuid v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User login' })
  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    example: '1',
    description: 'Integer number, increments on update',
  })
  @VersionColumn({ default: 0 })
  version: number;

  @ApiProperty({
    example: '1676130969000',
    description: 'timestamp of creation',
  })
  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @ApiProperty({
    example: '1676130969000',
    description: 'timestamp of last update',
  })
  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
