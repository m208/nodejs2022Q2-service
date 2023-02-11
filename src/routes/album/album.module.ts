import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), TrackModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
