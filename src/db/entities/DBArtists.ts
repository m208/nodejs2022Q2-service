import { Injectable } from '@nestjs/common';

import { DBEntity } from './DBEntities';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';

@Injectable()
export class DBArtists extends DBEntity<
  Artist,
  UpdateArtistDto,
  CreateArtistDto
> {
  async create(dto: CreateArtistDto) {
    const created: Artist = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }
}
