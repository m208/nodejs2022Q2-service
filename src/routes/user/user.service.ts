import { Injectable, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { DBInMemory } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(private db: DBInMemory) {}

  async createUser(userDto: CreateUserDto) {
    const query = await this.db.users.create(userDto);
    return query;
  }

  async findAll() {
    return this.db.users.findAll();
  }

  async findOne(uuid: string) {
    const user = this.db.users.findOne(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(uuid: string) {
    const user = await this.findOne(uuid);
    const query = this.db.users.delete(user.id);
    return query;
  }

  async update(id: string, userDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (user.password !== userDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    const query = await this.db.users.update(user.id, userDto);
    return query;
  }
}
