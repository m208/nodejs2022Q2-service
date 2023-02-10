import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Track } from '../src/routes/track/entities/track.entity';
import { CreateTracksTable1676058199508 } from './migrations/1676058199508-CreateTracksTable';

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
  entities: [Track],

  migrations: [CreateTracksTable1676058199508],
});

// ds.initialize();

// const connect = async () => {
//   try {
//     await ds.initialize();
//     console.log('Data Source has been initialized!');
//     return ds;
//   } catch (err) {
//     console.error('Error during Data Source initialization', err);
//   }
// };

// export const dataSource = connect();
