import { Injectable } from '@nestjs/common';
import { Track } from 'src/types';
import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTracDto, CreateTrackDto } from 'src/routes/track/dto/trackDto';

@Injectable()
export class DBTracks extends DBEntity<Track, UpdateTracDto, CreateTrackDto> {
  async create(dto: CreateTrackDto) {
    const created: Track = {
      ...dto,
      id: uuidv4(),
    };
    this.entities.push(created);
    return created;
  }

  // async update(id: string, updateDto: UpdateTracDto) {
  //   const index = this.entities.findIndex((el) => el.id === id);
  //   if (index >= 0) {
  //     const changed = {
  //       ...this.entities[index],

  //       password: updateDto.newPassword,
  //       updatedAt: Date.now(),
  //       version: this.entities[index].version + 1,
  //     };

  //     this.entities.splice(index, 1, changed);
  //     return changed;
  //   }
  // }
}
