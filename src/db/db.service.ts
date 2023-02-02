import { Injectable } from '@nestjs/common';
import { DBUsers } from './entities/DBEUsers';

@Injectable()
export class DBInMemory {
  users = new DBUsers();
}
