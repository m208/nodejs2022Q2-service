import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Delete, HttpCode, Put, UseGuards } from '@nestjs/common/decorators';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

const docs = {
  entity: 'Track',
  type: Track,
};

@ApiTags(`${docs.entity}s`)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private tracksService: TrackService) {}

  @Post()
  @ApiOperation({ summary: `Create ${docs.entity}` })
  @ApiCreatedResponse({ description: `${docs.entity} create`, type: docs.type })
  @ApiBadRequestResponse({ description: 'Required fields missing' })
  async create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: `Get all ${docs.entity}s` })
  @ApiOkResponse({ description: `All ${docs.entity}s`, type: [docs.type] })
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get ${docs.entity} by ID` })
  @ApiOkResponse({ description: 'The found record', type: docs.type })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  async findOne(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.findOne(uuid);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update ${docs.entity} by ID` })
  @ApiOkResponse({ description: `${docs.entity} updated`, type: docs.type })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  async update(
    @Body() dto: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) uuid: string,
  ) {
    return this.tracksService.update(uuid, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete ${docs.entity} by ID` })
  @ApiResponse({ status: 204, description: `${docs.entity} deleted` })
  @ApiResponse({ status: 400, description: 'Invalid id (not uuid)' })
  @ApiResponse({ status: 404, description: `${docs.entity} not exist` })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) uuid: string) {
    return this.tracksService.delete(uuid);
  }
}
