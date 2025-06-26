
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../../entities/user.entity';
import { Player } from '../../entities/player.entity';
import { Team } from '../../entities/team.entity';
import { Match } from '../../entities/match.entity';
import { Referee } from '../../entities/referee.entity';
import { News } from 'src/entities/news.entity';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Player, Team, Match, Referee, News]),
    LoggerModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
