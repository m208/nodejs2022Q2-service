import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { User } from 'src/types';

import { Delete, HttpCode, Put } from '@nestjs/common/decorators';
import { UpdateTracDto, CreateTrackDto } from './dto/trackDto';

@Controller('track')
export class TrackController {
  constructor(private tracksService: TrackService) {}

  @Post()
  async create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.findOne(uuid);
  }

  @Put(':id')
  async update(
    @Body() dto: UpdateTracDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.tracksService.update(uuid, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.delete(uuid);
  }
}
