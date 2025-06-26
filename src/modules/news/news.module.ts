import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from 'src/entities/news.entity';
import { Match } from '../../entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Match])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}