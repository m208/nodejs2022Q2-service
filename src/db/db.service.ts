import { Injectable } from '@nestjs/common';
import { DBUsers } from './entities/DBUsers';
import { DBTracks } from './entities/DBTracks';
import { DBArtists } from './entities/DBArtists';

@Injectable()
export class DBInMemory {
  users = new DBUsers();
  tracks = new DBTracks();
  artists = new DBArtists();
}
