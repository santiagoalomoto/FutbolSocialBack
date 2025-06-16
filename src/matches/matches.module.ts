import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { Match } from './match.entity';
import { Team } from '../teams/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team])],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
