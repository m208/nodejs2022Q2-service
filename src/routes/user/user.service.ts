import { Injectable, NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    // used to excluse password
    const user = await this.repository.save(dto);
    return new User({ ...user });
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const entry = await this.repository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException('User not found');
    }
    return entry;
  }

  async findOneByLogin(login: string) {
    const entry = await this.repository.findOne({ where: { login } });

    if (!entry) {
      throw new ForbiddenException('User not found');
    }
    return entry;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    return await this.repository.delete(user.id);
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    await this.repository.update(user.id, { password: dto.newPassword });
    return await this.findOne(id);
  }
}
