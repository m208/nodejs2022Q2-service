import { Body, Controller, Get, Post } from '@nestjs/common';
import { DBInMemory } from 'src/db/db.service';
import { User } from 'src/types';

@Controller('user')
export class UserController {
  constructor(private db: DBInMemory) {}

  @Post()
  async create(@Body() createCatDto: User) {
    this.db.users.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.db.users.findAll();
  }
}
