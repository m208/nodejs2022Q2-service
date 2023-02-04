import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: DBInMemory) {}

  async create(dto: CreateAlbumDto) {
    if (dto.artistId !== null) {
      const artist = this.db.artists.findOne(dto.artistId);

      if (!artist) {
        throw new BadRequestException('This Artist not existed');
      }
    }

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
    const tracks = await this.db.tracks.findMany({
      key: 'albumId',
      equals: uuid,
    });

    for (const track of tracks) {
      await this.db.tracks.update(track.id, {
        ...track,
        albumId: null,
      });
    }

    return query;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const entry = await this.findOne(id);
    const query = await this.db.albums.update(entry.id, dto);
    return query;
  }
}
