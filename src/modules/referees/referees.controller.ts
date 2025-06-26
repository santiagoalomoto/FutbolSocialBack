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

import { RefereesService } from './referees.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RefereeResponseDto } from './dto/referee-response.dto';

@ApiTags('referees')
@ApiBearerAuth()
@Controller('referees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RefereesController {
  constructor(private readonly service: RefereesService) {}


  @Roles('admin', 'editor')
  @Post()
  @ApiResponse({ status: 201, type: RefereeResponseDto })
  create(@Body() body): Promise<RefereeResponseDto> {
    return this.service.create(body);
  }


  @Get()
  @ApiResponse({ status: 200, type: [RefereeResponseDto] })
  findAll(): Promise<RefereeResponseDto[]> {
    return this.service.findAll();
  }


  @Get(':id')
  @ApiResponse({ status: 200, type: RefereeResponseDto })
  findOne(@Param('id') id: number): Promise<RefereeResponseDto> {
    return this.service.findOne(id);
  }


  @Roles('admin', 'editor')
  @Put(':id')
  @ApiResponse({ status: 200, type: RefereeResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<RefereeResponseDto> {
    return this.service.update(id, body);
  }


  @Roles('admin')
  @Delete(':id')
  @ApiResponse({ status: 200, type: RefereeResponseDto })
  delete(@Param('id') id: number): Promise<RefereeResponseDto> {
    return this.service.delete(id);
  }
}