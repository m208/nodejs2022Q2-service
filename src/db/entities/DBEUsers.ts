import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/types';
import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DBUsers extends DBEntity<User, UpdatePasswordDto, CreateUserDto> {
  async create(dto: CreateUserDto) {
    const created: User = {
      ...dto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 0,
    };
    this.entities.push(created);
    return created;
  }
}
