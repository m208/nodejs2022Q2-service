import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { Delete, HttpCode } from '@nestjs/common/decorators';

import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { FavoritesResponse } from './dto/response-favs.dto';

const docs = {
  entity: 'Favorites',
  type: FavoritesResponse,
};

@ApiTags(`${docs.entity}`)
@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: `Get all ${docs.entity}` })
  @ApiResponse({
    status: 200,
    description: `All ${docs.entity}`,
    type: [docs.type],
  })
  async findAll() {
    return this.favsService.getAllFavs();
  }

  @Post('track/:id')
  @ApiOperation({ summary: `Add track to the favorites` })
  @ApiCreatedResponse({ description: 'Added to favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Item not existed' })
  async addTrack(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addTrack(uuid);
  }

  @Post('album/:id')
  @ApiOperation({ summary: `Add album to the favorites` })
  @ApiCreatedResponse({ description: 'Added to favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Item not existed' })
  async addAlbum(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addAlbum(uuid);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: `Add artist to the favorites` })
  @ApiCreatedResponse({ description: 'Added to favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Item not existed' })
  async addArtist(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.addArtist(uuid);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete track from favorites` })
  @ApiNoContentResponse({ description: 'Deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiNotFoundResponse({ description: 'Item not in favorites' })
  async delTrack(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delTrack(uuid);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete album from favorites` })
  @ApiNoContentResponse({ description: 'Deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiNotFoundResponse({ description: 'Item not in favorites' })
  async delAlbum(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delAlbum(uuid);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: `Delete artist from favorites` })
  @ApiNoContentResponse({ description: 'Deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiNotFoundResponse({ description: 'Item not in favorites' })
  async delArtist(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.favsService.delArtist(uuid);
  }
}
