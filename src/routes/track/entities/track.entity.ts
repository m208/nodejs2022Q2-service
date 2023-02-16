import { Album } from 'src/routes/album/entities/album.entity';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Track {
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

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album;
}
