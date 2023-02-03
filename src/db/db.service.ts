import { Injectable } from '@nestjs/common';
import { DBUsers } from './entities/DBUsers';
import { DBTracks } from './entities/DBTracks';

@Injectable()
export class DBInMemory {
  users = new DBUsers();
  tracks = new DBTracks();
}
