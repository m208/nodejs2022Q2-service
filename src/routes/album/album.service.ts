import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private repository: Repository<Album>,
    private tracksService: TrackService,
    private artistsService: ArtistService,
  ) {}

  async create(dto: CreateAlbumDto) {
    if (dto.artistId !== null) {
      const artist = await this.artistsService.isArtistExisted(dto.artistId);

      if (!artist) {
        throw new BadRequestException('This Artist not existed');
      }
    }

    return await this.repository.save(dto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string, throwErrors = true) {
    const entry = await this.repository.findOneBy({ id });

    if (!entry && throwErrors) {
      throw new NotFoundException('Album not found');
    }
    return entry;
  }

  async delete(id: string) {
    const entry = await this.findOne(id);
    await this.tracksService.clearAlbum(id);

    return await this.repository.delete(entry.id);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const entry = await this.findOne(id);
    await this.repository.update(entry.id, dto);
    return await this.findOne(id);
  }
}
