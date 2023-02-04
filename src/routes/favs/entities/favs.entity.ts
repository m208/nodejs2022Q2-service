import { IFavorites } from 'src/types';

export class Favorites implements IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}
