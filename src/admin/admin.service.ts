import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/user.entity';
import { Player } from '../players/player.entity';
import { Team } from '../teams/team.entity';
import { Match } from '../matches/match.entity';
import { Referee } from '../referees/referee.entity';
import { News } from '../news/news.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(Match) private matchRepo: Repository<Match>,
    @InjectRepository(Referee) private refereeRepo: Repository<Referee>,
    @InjectRepository(News) private newsRepo: Repository<News>,
  ) {}

 async getDashboardData() {
  const totals = {
    users: await this.userRepo.count(),
    players: await this.playerRepo.count(),
    teams: await this.teamRepo.count(),
    matches: await this.matchRepo.count(),
    referees: await this.refereeRepo.count(),
    news: await this.newsRepo.count(),
  };

  const recentUsers = await this.userRepo.find({
    order: { id: 'DESC' },
    take: 5,
    select: ['id', 'email'],
  });

  const recentMatches = await this.matchRepo.find({
    order: { date: 'DESC' },
    take: 5,
    relations: ['team1', 'team2'],
    select: ['id', 'date', 'league', 'status', 'team1', 'team2'],
  });

  const recentReferees = await this.refereeRepo.find({
    order: { id: 'DESC' },
    take: 5,
    select: ['id', 'name'],
  });

  const recentNews = await this.newsRepo.find({
    order: { date: 'DESC' },
    take: 5,
    select: ['id', 'title', 'date'],
  });

  return {
    totals,
    recent: {
      users: recentUsers,
      matches: recentMatches,
      referees: recentReferees,
      news: recentNews,
    },
  };
}

}
