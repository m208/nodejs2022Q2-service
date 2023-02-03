import { Injectable, NotFoundException } from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DBInMemory) {}

  async create(dto: CreateArtistDto) {
    return this.db.artists.create(dto);
  }

  async findAll() {
    return this.db.artists.findAll();
  }

  async findOne(uuid: string) {
    const entry = this.db.artists.findOne(uuid);
    if (!entry) {
      throw new NotFoundException('Track not found');
    }
    return entry;
  }

  async delete(uuid: string) {
    const entry = await this.findOne(uuid);

    const query = this.db.artists.delete(entry.id);
    const tracks = this.db.tracks.findMany({ key: 'artistId', equals: uuid });

    for (const track of tracks) {
      await this.db.tracks.update(track.id, {
        ...track,
        artistId: null,
      });
    }

    return query;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const entry = await this.findOne(id);
    const query = await this.db.artists.update(entry.id, dto);
    return query;
  }
}
