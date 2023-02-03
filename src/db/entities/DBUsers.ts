import { Injectable } from '@nestjs/common';
import { User } from 'src/types';
import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto, CreateUserDto } from 'src/routes/user/dto/userDto';

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

  async update(id: string, updateDto: UpdatePasswordDto) {
    const index = this.entities.findIndex((el) => el.id === id);
    if (index >= 0) {
      const changed = {
        ...this.entities[index],

        password: updateDto.newPassword,
        updatedAt: Date.now(),
        version: this.entities[index].version + 1,
      };

      this.entities.splice(index, 1, changed);
      return changed;
    }
  }
}
