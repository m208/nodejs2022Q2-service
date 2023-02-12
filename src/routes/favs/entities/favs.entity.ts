import { Album } from 'src/routes/album/entities/album.entity';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { Track } from 'src/routes/track/entities/track.entity';
import { Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FavoriteTracks {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn()
  related: Track;
}

@Entity()
export class FavoriteArtists {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn()
  related: Artist;
}

@Entity()
export class FavoriteAlbums {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn()
  related: Album;
}
