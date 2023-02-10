import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto) {
    return await this.tracksRepository.save(dto);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const entry = await this.tracksRepository.findOneBy({ id });

    if (!entry) {
      throw new NotFoundException('Track not found');
    }
    return entry;
  }

  async delete(id: string) {
    const entry = await this.findOne(id);

    //this.db.favorites.track.removeItem(uuid);

    return await this.tracksRepository.delete(entry.id);
  }

  async update(id: string, dto: UpdateTrackDto) {
    const entry = await this.findOne(id);
    await this.tracksRepository.update(entry.id, dto);
    return await this.findOne(id);
  }
}
