import { Injectable } from '@nestjs/common';
import { IUser } from 'src/types';
import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from 'src/routes/user/dto/update-user.dto';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';

@Injectable()
export class DBUsers extends DBEntity<IUser, UpdatePasswordDto, CreateUserDto> {
  async create(dto: CreateUserDto) {
    const created: IUser = {
      ...dto,
      id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
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
