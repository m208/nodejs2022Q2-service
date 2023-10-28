import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './routes/user/user.controller';
import { TrackController } from './routes/track/track.controller';
import { DBInMemory } from './db/db.service';
import { UserService } from './routes/user/user.service';
import { TrackService } from './routes/track/track.service';
import { ArtistController } from './routes/artist/artist.controller';
import { ArtistService } from './routes/artist/artist.service';
import { AlbumController } from './routes/album/album.controller';
import { AlbumService } from './routes/album/album.service';
import { FavoritesService } from './routes/favs/favs.service';
import { FavoritesController } from './routes/favs/favs.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UserService,
    DBInMemory,
    TrackService,
    ArtistService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
