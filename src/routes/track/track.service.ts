import { Injectable, NotFoundException } from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { CreateTrackDto, UpdateTracDto } from './dto/trackDto';

@Injectable()
export class TrackService {
  constructor(private db: DBInMemory) {}

  async create(userDto: CreateTrackDto) {
    const query = await this.db.tracks.create(userDto);
    return query;
  }

  async findAll() {
    return this.db.users.findAll();
  }

  async findOne(uuid: string) {
    const user = this.db.tracks.findOne(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async delete(uuid: string) {
    const user = await this.findOne(uuid);
    const query = this.db.tracks.delete(user.id);
    return query;
  }

  async update(id: string, userDto: UpdateTracDto) {
    const user = await this.findOne(id);
    const query = await this.db.tracks.update(user.id, userDto);
    return query;
  }
}
