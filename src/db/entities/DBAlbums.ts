import { Injectable } from '@nestjs/common';

import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from 'src/routes/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { Album } from 'src/routes/album/entities/album.entity';

@Injectable()
export class DBAlbums extends DBEntity<Album, UpdateAlbumDto, CreateAlbumDto> {
  async create(dto: CreateAlbumDto) {
    const created: Album = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
