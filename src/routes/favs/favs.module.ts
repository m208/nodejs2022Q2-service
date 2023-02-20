import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from './entities/favs.entity';
import { FavoritesController } from './favs.controller';
import { FavoritesService } from './favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteTracks, FavoriteArtists, FavoriteAlbums]),
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
