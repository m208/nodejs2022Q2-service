import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

const docs = {
  entity: 'Track',
  type: Track,
};

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private tracksService: TrackService) {}

  @ApiOperation({ summary: `Create ${docs.entity}` })
  @ApiResponse({ status: 201, type: docs.type })
  @Post()
  async create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @ApiOperation({ summary: `Get all ${docs.entity}s` })
  @ApiResponse({ status: 200, type: [docs.type] })
  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.findOne(uuid);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update ${docs.entity} by ID` })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: docs.type,
  })
  async update(
    @Body() dto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.tracksService.update(uuid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete ${docs.entity} by ID` })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.delete(uuid);
  }
}
