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
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MatchResponseDto } from './dto/match-response.dto';

@ApiTags('matches')
@Controller('matches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MatchesController {
  constructor(private readonly service: MatchesService) {}

  @Roles('admin', 'editor')
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: MatchResponseDto })
  create(@Body() body): Promise<MatchResponseDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [MatchResponseDto] })
  findAll(): Promise<MatchResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MatchResponseDto })
  findOne(@Param('id') id: number): Promise<MatchResponseDto> {
    return this.service.findOne(id);
  }

  @Roles('admin', 'editor')
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MatchResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<MatchResponseDto> {
    return this.service.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: MatchResponseDto })
  delete(@Param('id') id: number): Promise<MatchResponseDto> {
    return this.service.delete(id);
  }
}