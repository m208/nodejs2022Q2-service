import { Injectable } from '@nestjs/common';

import { DBEntity } from './DBentities';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { Track } from 'src/routes/track/entities/track.entity';

@Injectable()
export class DBTracks extends DBEntity<Track, UpdateTrackDto, CreateTrackDto> {
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
