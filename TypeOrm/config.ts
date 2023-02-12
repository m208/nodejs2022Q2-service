import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Track } from '../src/routes/track/entities/track.entity';
import { Artist } from '../src/routes/artist/entities/artist.entity';
import { Album } from '../src/routes/album/entities/album.entity';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from '../src/routes/favs/entities/favs.entity';
import { User } from '../src/routes/user/entities/user.entity';
import { InitialCreating1676222322081 } from './migrations/1676222322081-CreateDatabase';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  // host: process.env.POSTGRESS_HOST,
  // port: +process.env.POSTGRESS_PORT,
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRESS_PASSWORD,
  // database: process.env.POSTGRES_DB,
  //host: configService.get('POSTGRES_HOST'),
  host: '192.168.0.100',
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
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
  migrations: [InitialCreating1676222322081],
});
