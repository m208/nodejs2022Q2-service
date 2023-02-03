import { Injectable, NotFoundException } from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DBInMemory) {}

  async create(userDto: CreateTrackDto) {
    return this.db.tracks.create(userDto);
  }

  async findAll() {
    return this.db.tracks.findAll();
  }

  async findOne(uuid: string) {
    const entry = this.db.tracks.findOne(uuid);
    if (!entry) {
      throw new NotFoundException('Track not found');
    }
    return entry;
  }

  async delete(uuid: string) {
    const entry = await this.findOne(uuid);
    const query = this.db.tracks.delete(entry.id);
    return query;
  }

  async update(id: string, userDto: UpdateTrackDto) {
    const entry = await this.findOne(id);
    const query = await this.db.tracks.update(entry.id, userDto);
    return query;
  }
}
