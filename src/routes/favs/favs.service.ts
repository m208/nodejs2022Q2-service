import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DBInMemory } from 'src/db/db.service';
import { FavoritesResponse } from './dto/response-favs.dto';
import { FavItems } from './favs.controller';

@Injectable()
export class FavoritesService {
  constructor(private db: DBInMemory) {}

  itemDBLink = {
    track: this.db.tracks,
    album: this.db.albums,
    artist: this.db.artists,
  };
  favoritesDBLink = {
    track: this.db.favorites.track,
    album: this.db.favorites.album,
    artist: this.db.favorites.artist,
  };

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

  addFav(type: FavItems, id: string) {
    const item = this.itemDBLink[type].findOne(id);
    if (item) {
      return this.favoritesDBLink[type].addItem(id);
    }

    throw new UnprocessableEntityException('Item not exist');
  }

  delFav(type: FavItems, id: string) {
    const item = this.itemDBLink[type].findOne(id);
    if (item) {
      return this.favoritesDBLink[type].removeItem(id);
    }

    throw new NotFoundException('Item not found in favorites');
  }
}
