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
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

const docs = {
  entity: 'Artist',
  type: Artist,
};

@ApiTags(`${docs.entity}s`)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: `Create ${docs.entity}` })
  @ApiResponse({ status: 201, type: docs.type })
  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @ApiOperation({ summary: `Get all ${docs.entity}s` })
  @ApiResponse({ status: 200, type: [docs.type] })
  @Get()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.artistService.findOne(uuid);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async update(
    @Body() dto: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.artistService.update(uuid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete ${docs.entity} by ID` })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.artistService.delete(uuid);
  }
}
