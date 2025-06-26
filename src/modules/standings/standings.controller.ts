import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { StandingsService } from './standings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { StandingResponseDto } from './dto/standing-response.dto';

@ApiTags('standings')
@ApiBearerAuth()
@Controller('standings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StandingsController {
  constructor(private readonly service: StandingsService) {}


  @Roles('admin', 'editor')
  @Post()
  @ApiResponse({ status: 201, type: StandingResponseDto })
  create(@Body() body): Promise<StandingResponseDto> {
    return this.service.create(body);
  }


  @Get()
  @ApiResponse({ status: 200, type: [StandingResponseDto] })
  findAll(): Promise<StandingResponseDto[]> {
    return this.service.findAll();
  }


  @Get(':id')
  @ApiResponse({ status: 200, type: StandingResponseDto })
  findOne(@Param('id') id: number): Promise<StandingResponseDto> {
    return this.service.findOne(id);
  }


  @Roles('admin', 'editor')
  @Put(':id')
  @ApiResponse({ status: 200, type: StandingResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<StandingResponseDto> {
    return this.service.update(id, body);
  }


  @Roles('admin')
  @Delete(':id')
  @ApiResponse({ status: 200, type: StandingResponseDto })
  delete(@Param('id') id: number): Promise<StandingResponseDto> {
    return this.service.delete(id);
  }
}