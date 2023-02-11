import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './routes/track/track.module';
import { DataSource } from 'typeorm';
import { AlbumModule } from './routes/album/album.module';
import { ArtistModule } from './routes/artist/artist.module';
import { Track } from './routes/track/entities/track.entity';
import { Artist } from './routes/artist/entities/artist.entity';

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

      entities: [Track, Artist],
      synchronize: true,
    }),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
