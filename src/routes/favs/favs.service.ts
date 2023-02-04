import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { FavoritesResponse } from './dto/response-favs.dto';

@Injectable()
export class FavoritesService {
  constructor(private db: DBInMemory) {}

  async getAllFavs(): Promise<FavoritesResponse> {
    const artistsIds = this.db.favorites.artist.getAll();
    const artists = await this.db.artists.findMany({
      key: 'id',
      equalsAnyOf: artistsIds,
    });

    const albumsIds = this.db.favorites.album.getAll();
    const albums = await this.db.albums.findMany({
      key: 'id',
      equalsAnyOf: albumsIds,
    });

    const tracksIds = this.db.favorites.track.getAll();
    const tracks = await this.db.tracks.findMany({
      key: 'id',
      equalsAnyOf: tracksIds,
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  addTrack(id: string) {
    const track = this.db.tracks.findOne(id);
    if (track) {
      return this.db.favorites.track.addItem(id);
    }

    throw new UnprocessableEntityException('Item not exist');
  }
  addAlbum(id: string) {
    const album = this.db.albums.findOne(id);
    if (album) {
      return this.db.favorites.album.addItem(id);
    }

    throw new UnprocessableEntityException('Item not exist');
  }
  addArtist(id: string) {
    const artist = this.db.artists.findOne(id);
    if (artist) {
      return this.db.favorites.artist.addItem(id);
    }

    throw new UnprocessableEntityException('Item not exist');
  }

  delTrack(id: string) {
    const favoriteItem = this.db.favorites.track.findOne(id);
    if (favoriteItem) {
      return this.db.favorites.track.removeItem(id);
    }

    throw new NotFoundException('Item not found in favorites');
  }

  delAlbum(id: string) {
    const favoriteItem = this.db.favorites.album.findOne(id);
    if (favoriteItem) {
      return this.db.favorites.album.removeItem(id);
    }

    throw new NotFoundException('Item not found in favorites');
  }

  delArtist(id: string) {
    const favoriteItem = this.db.favorites.artist.findOne(id);
    if (favoriteItem) {
      return this.db.favorites.artist.removeItem(id);
    }

    throw new NotFoundException('Item not found in favorites');
  }
}
