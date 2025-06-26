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
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { NewsResponseDto } from './dto/news-response.dto';

@ApiTags('news')
@Controller('news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Roles('admin', 'editor')
  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: NewsResponseDto })
  create(@Body() body): Promise<NewsResponseDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [NewsResponseDto] })
  findAll(): Promise<NewsResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: NewsResponseDto })
  findOne(@Param('id') id: number): Promise<NewsResponseDto> {
    return this.service.findOne(id);
  }

  @Roles('admin', 'editor')
  @Put(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: NewsResponseDto })
  update(@Param('id') id: number, @Body() body): Promise<NewsResponseDto> {
    return this.service.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: NewsResponseDto })
  delete(@Param('id') id: number): Promise<NewsResponseDto> {
    return this.service.delete(id);
  }
}