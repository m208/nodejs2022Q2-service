import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

const docs = {
  entity: 'Album',
  type: Album,
};

@ApiTags(`${docs.entity}s`)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: `Create ${docs.entity}` })
  @ApiResponse({ status: 201, type: docs.type })
  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @ApiOperation({ summary: `Get all ${docs.entity}s` })
  @ApiResponse({ status: 200, type: [docs.type] })
  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.albumService.findOne(uuid);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async update(
    @Body() dto: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.albumService.update(uuid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete ${docs.entity} by ID` })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.albumService.delete(uuid);
  }
}
