import { ITrack } from 'src/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
