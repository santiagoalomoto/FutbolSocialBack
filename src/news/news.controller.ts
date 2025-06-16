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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Roles('admin', 'editor')
  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Roles('admin', 'editor')
  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.service.update(id, body);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
