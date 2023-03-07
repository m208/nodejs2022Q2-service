import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { TrackService } from '../track/track.service';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from './entities/favs.entity';
import { FavItems } from './favs.controller';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteTracks)
    private repositoryFavTracks: Repository<FavoriteTracks>,

    @InjectRepository(FavoriteArtists)
    private repositoryFavArtists: Repository<FavoriteArtists>,

    @InjectRepository(FavoriteAlbums)
    private repositoryFavAlbums: Repository<FavoriteAlbums>,

    private tracksService: TrackService,
    private artistsService: ArtistService,
    private albumsService: AlbumService,
  ) {}

  itemRepositoty = {
    track: this.tracksService,
    album: this.albumsService,
    artist: this.artistsService,
  };
  favRepository = {
    track: this.repositoryFavTracks,
    album: this.repositoryFavAlbums,
    artist: this.repositoryFavArtists,
  };
  favType = {
    track: FavoriteTracks,
    album: FavoriteAlbums,
    artist: FavoriteArtists,
  };

  async getAllFavs() {
    const getEntries = async (type: FavItems) => {
      return (
        await this.favRepository[type].find({
          relations: { related: true },
        })
      ).map((el: { related: Track | Album | Artist }) => el.related);
    };

    return {
      tracks: await getEntries('track'),
      artists: await getEntries('artist'),
      albums: await getEntries('album'),
    };
  }

  async addFav(type: FavItems, id: string) {
    const item = await this.itemRepositoty[type].findOne(id, false);

    if (item) {
      const favItem = new this.favType[type]();
      favItem.id = id;
      favItem.related = item;

      // TS do not allow use object instead switch here
      switch (type) {
        case 'album':
          return await this.repositoryFavAlbums.save(favItem);
        case 'artist':
          return await this.repositoryFavArtists.save(favItem);
        case 'track':
          return await this.repositoryFavTracks.save(favItem);
      }
    }

    throw new UnprocessableEntityException(
      `${type} with such id does not exist`,
    );
  }

  delFav(type: FavItems, id: string) {
    const item = this.favRepository[type].findOne({ where: { id } });
    if (item) {
      return this.favRepository[type].delete(id);
    }
    throw new NotFoundException('Item not found in favorites');
  }
}
