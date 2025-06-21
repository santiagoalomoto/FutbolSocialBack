import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { User } from '../users/user.entity';
import { Player } from '../players/player.entity';
import { Team } from '../teams/team.entity';
import { Match } from '../matches/match.entity';
import { Referee } from '../referees/referee.entity';
import { News } from '../news/news.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, Team, Match, Referee, News]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
