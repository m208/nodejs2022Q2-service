import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './routes/user/user.controller';
import { DBInMemory } from './db/db.service';
import { UserModule } from './routes/user/user.module';
import { UserService } from './routes/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, DBInMemory],
})
export class AppModule {}
