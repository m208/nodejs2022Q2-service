import { Album } from 'src/routes/album/entities/album.entity';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { Track } from 'src/routes/track/entities/track.entity';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
