import { DataSource } from 'typeorm';
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

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
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
  migrations: [InitialCreating1676222322081],
});
