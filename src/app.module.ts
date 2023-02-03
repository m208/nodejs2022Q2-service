import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './routes/user/user.controller';
import { TrackController } from './routes/track/track.controller';
import { DBInMemory } from './db/db.service';
import { UserModule } from './routes/user/user.module';
import { UserService } from './routes/user/user.service';
import { TrackService } from './routes/track/track.service';
import { ArtistController } from './routes/artist/artist.controller';
import { ArtistService } from './routes/artist/artist.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
  ],
  providers: [AppService, UserService, DBInMemory, TrackService, ArtistService],
})
export class AppModule {}
