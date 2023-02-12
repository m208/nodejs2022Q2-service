import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './routes/track/track.module';
import { DataSource } from 'typeorm';
import { AlbumModule } from './routes/album/album.module';
import { ArtistModule } from './routes/artist/artist.module';
import { Track } from './routes/track/entities/track.entity';
import { Artist } from './routes/artist/entities/artist.entity';
import { Album } from './routes/album/entities/album.entity';
import { UserModule } from './routes/user/user.module';
import { User } from './routes/user/entities/user.entity';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from './routes/favs/entities/favs.entity';
import { FavoritesModule } from './routes/favs/favs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: +process.env.POSTGRESS_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,

      entities: [
        Track,
        Artist,
        Album,
        User,
        FavoriteAlbums,
        FavoriteArtists,
        FavoriteTracks,
      ],
      synchronize: false,
    }),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
