import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), ArtistModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
