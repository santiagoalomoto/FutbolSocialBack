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

  async getDashboardStats() {
    const totalUsers = await this.userRepo.count();
    const totalPlayers = await this.playerRepo.count();
    const totalTeams = await this.teamRepo.count();
    const totalMatches = await this.matchRepo.count();
    const totalReferees = await this.refereeRepo.count();
    const totalNews = await this.newsRepo.count();

    const recentUsers = await this.userRepo.find({
      order: { id: 'DESC' },
      take: 5,
    });

    const recentMatches = await this.matchRepo.find({
      order: { date: 'DESC' },
      take: 5,
    });

    return {
      totals: {
        users: totalUsers,
        players: totalPlayers,
        teams: totalTeams,
        matches: totalMatches,
        referees: totalReferees,
        news: totalNews,
      },
      recent: {
        users: recentUsers,
        matches: recentMatches,
      },
    };
  }
}
