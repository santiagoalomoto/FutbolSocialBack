
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { Standing } from '../../entities/standing.entity';
import { Team } from '../../entities/team.entity';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Standing, Team]), LoggerModule],
  providers: [StandingsService],
  controllers: [StandingsController],
})
export class StandingsModule {}
