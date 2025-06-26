import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TeamResponseDto } from './dto/team-response.dto';

@ApiTags('teams')
@Controller('teams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Roles('admin', 'editor')
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: TeamResponseDto })
  create(@Body() body): Promise<TeamResponseDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [TeamResponseDto] })
  findAll(): Promise<TeamResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TeamResponseDto })
  findOne(@Param('id') id: number): Promise<TeamResponseDto> {
    return this.service.findOne(id);
  }

  @Roles('admin', 'editor')
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TeamResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<TeamResponseDto> {
    return this.service.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TeamResponseDto })
  delete(@Param('id') id: number): Promise<TeamResponseDto> {
    return this.service.delete(id);
  }
}