import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { Delete, HttpCode } from '@nestjs/common/decorators';

import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FavoritesResponse } from './dto/response-favs.dto';

const docs = {
  entity: 'Favorites',
  type: FavoritesResponse,
};

@ApiTags(`${docs.entity}`)
@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @ApiOperation({ summary: `Get all ${docs.entity}` })
  @ApiResponse({ status: 200, type: [docs.type] })
  @Get()
  async findAll() {
    return this.favsService.getAllFavs();
  }

  @Post('track/:id')
  @ApiOperation({ summary: `Add track to the favorites` })
  @ApiResponse({ status: 201, type: String })
  async addTrack(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addTrack(uuid);
  }

  @Post('album/:id')
  @ApiOperation({ summary: `Add album to the favorites` })
  @ApiResponse({ status: 201, type: String })
  async addAlbum(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addAlbum(uuid);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: `Add artist to the favorites` })
  @ApiResponse({ status: 201, type: String })
  async addArtist(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addArtist(uuid);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete track from favorites` })
  @ApiResponse({ status: 204 })
  async delTrack(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delTrack(uuid);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete album from favorites` })
  @ApiResponse({ status: 204 })
  async delAlbum(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delAlbum(uuid);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete artist from favorites` })
  @ApiResponse({ status: 204 })
  async delArtist(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delArtist(uuid);
  }
}
