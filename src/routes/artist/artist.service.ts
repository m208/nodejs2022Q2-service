import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackService } from '../track/track.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private repository: Repository<Artist>,
    private tracksService: TrackService,
  ) {}

  async create(dto: CreateArtistDto) {
    return await this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    const entry = await this.repository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException('Artist not found');
    }
    return entry;
  }

  async delete(id: string) {
    const entry = await this.findOne(id);

    await this.tracksService.clearArtist(id);

    // this.db.favorites.artist.removeItem(uuid);

    return await this.repository.delete(entry.id);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const entry = await this.findOne(id);
    await this.repository.update(entry.id, dto);
    return await this.findOne(id);
  }

  async isArtistExisted(id: string) {
    const entry = await this.repository.findOneBy({ id });
    return !!entry;
  }
}
