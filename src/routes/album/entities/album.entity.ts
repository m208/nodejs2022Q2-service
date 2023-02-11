import { IAlbum } from 'src/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;
}
