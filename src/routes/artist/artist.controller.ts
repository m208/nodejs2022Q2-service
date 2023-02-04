import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

const docs = {
  entity: 'Artist',
  type: Artist,
};

@ApiTags(`${docs.entity}s`)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: `Create ${docs.entity}` })
  @ApiCreatedResponse({ description: `${docs.entity} create`, type: docs.type })
  @ApiResponse({ status: 400, description: 'Required fields missing' })
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: `Get all ${docs.entity}s` })
  @ApiOkResponse({ description: `All ${docs.entity}s`, type: [docs.type] })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get ${docs.entity} by ID` })
  @ApiOkResponse({ description: 'The found record', type: docs.type })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.artistService.findOne(uuid);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update ${docs.entity} by ID` })
  @ApiOkResponse({ description: `${docs.entity} updated`, type: docs.type })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  async update(
    @Body() dto: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.artistService.update(uuid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete ${docs.entity} by ID` })
  @ApiResponse({ status: 204, description: `${docs.entity} deleted` })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.artistService.delete(uuid);
  }
}
