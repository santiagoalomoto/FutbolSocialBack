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
import { PlayersService } from './players.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { PlayerResponseDto } from './dto/player-response.dto';

@ApiTags('players')
@Controller('players')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlayersController {
  constructor(private readonly service: PlayersService) {}

  @Roles('admin', 'editor')
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: PlayerResponseDto })
  create(@Body() body): Promise<PlayerResponseDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [PlayerResponseDto] })
  findAll(): Promise<PlayerResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PlayerResponseDto })
  findOne(@Param('id') id: number): Promise<PlayerResponseDto> {
    return this.service.findOne(id);
  }

  @Roles('admin', 'editor')
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PlayerResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<PlayerResponseDto> {
    return this.service.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PlayerResponseDto })
  delete(@Param('id') id: number): Promise<PlayerResponseDto> {
    return this.service.delete(id);
  }
}