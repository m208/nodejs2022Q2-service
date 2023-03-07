import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favs.service';
import { Delete, HttpCode, UseGuards } from '@nestjs/common/decorators';
import { validate } from 'uuid';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FavoritesResponse } from './dto/response-favs.dto';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtAuthGuard } from '../auth/auth.guard';

const docs = {
  entity: 'Favorites',
  type: FavoritesResponse,
};

const favItems = ['track', 'album', 'artist'];
export type FavItems = 'track' | 'album' | 'artist';

@ApiTags(`${docs.entity}`)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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

  @Post('/:type/:id')
  @ApiParam({ name: 'type', type: `string` })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: `Add item (track/album/artist) to the favorites` })
  @ApiCreatedResponse({ description: 'Added to favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: 'Item not existed' })
  async handleAddFav(@Param() params: { type: FavItems; id: string }) {
    if (!validate(params.id)) {
      throw new BadRequestException('Invalid id (not uuid)');
    }

    if (favItems.includes(params.type)) {
      return this.favsService.addFav(params.type, params.id);
    }
    throw new NotFoundException('Path does not exist');
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  @ApiParam({ name: 'type', type: `string` })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: `Delete item (track/album/artist) from favorites` })
  @ApiNoContentResponse({ description: 'Deleted from favorites' })
  @ApiBadRequestResponse({ description: 'Invalid id (not uuid)' })
  @ApiNotFoundResponse({ description: 'Item not in favorites' })
  async delFav(@Param() params: { type: FavItems; id: string }) {
    if (!validate(params.id)) {
      throw new BadRequestException('Invalid id (not uuid)');
    }

    if (favItems.includes(params.type)) {
      return this.favsService.delFav(params.type, params.id);
    }
    throw new NotFoundException('Path does not exist');
  }
}
