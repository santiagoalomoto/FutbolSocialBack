import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { Standing } from '../../entities/standing.entity';
import { Team } from '../../entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Standing, Team])],
  providers: [StandingsService],
  controllers: [StandingsController],
})
export class StandingsModule {}
