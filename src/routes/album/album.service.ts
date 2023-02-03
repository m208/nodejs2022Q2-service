import { Injectable, NotFoundException } from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DBInMemory) {}

  async create(dto: CreateAlbumDto) {
    return this.db.albums.create(dto);
  }

  async findAll() {
    return this.db.albums.findAll();
  }

  async findOne(uuid: string) {
    const entry = this.db.albums.findOne(uuid);
    if (!entry) {
      throw new NotFoundException('Track not found');
    }
    return entry;
  }

  async delete(uuid: string) {
    const entry = await this.findOne(uuid);
    const query = this.db.albums.delete(entry.id);
    return query;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const entry = await this.findOne(id);
    const query = await this.db.albums.update(entry.id, dto);
    return query;
  }
}
