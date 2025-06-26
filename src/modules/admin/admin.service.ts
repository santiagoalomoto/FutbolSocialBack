import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';
import { Player } from '../../entities/player.entity';
import { Team } from '../../entities/team.entity';
import { Match } from '../../entities/match.entity';
import { Referee } from '../../entities/referee.entity';
import { News } from 'src/entities/news.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Player) private playerRepo: Repository<Player>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    @InjectRepository(Match) private matchRepo: Repository<Match>,
    @InjectRepository(Referee) private refereeRepo: Repository<Referee>,
    @InjectRepository(News) private newsRepo: Repository<News>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  async getDashboardData() {
    this.logger.log('Fetching dashboard data for admin');
    const totals = {
      users: await this.userRepo.count(),
      players: await this.playerRepo.count(),
      teams: await this.teamRepo.count(),
      matches: await this.matchRepo.count(),
      referees: await this.refereeRepo.count(),
      news: await this.newsRepo.count(),
    };

    const recentUsers = (await this.userRepo.find({
      order: { id: 'DESC' },
      take: 5,
      select: ['id', 'email'],
    })).map(u => ({ id: u.id, email: u.email }));

    const recentMatches = (await this.matchRepo.find({
      order: { date: 'DESC' },
      take: 5,
      relations: ['team1', 'team2'],
      select: ['id', 'date', 'league', 'status', 'team1', 'team2'],
    })).map(m => ({
      id: m.id,
      date: (m.date && Object.prototype.toString.call(m.date) === '[object Date]') ? (m.date as unknown as Date).toISOString() : m.date,
      league: m.league,
      status: m.status,
      team1: m.team1,
      team2: m.team2,
    }));

    const recentReferees = (await this.refereeRepo.find({
      order: { id: 'DESC' },
      take: 5,
      select: ['id', 'name'],
    })).map(r => ({ id: r.id, name: r.name }));

    const recentNews = (await this.newsRepo.find({
      order: { date: 'DESC' },
      take: 5,
      select: ['id', 'title', 'date'],
    })).map(n => ({
      id: n.id,
      title: n.title,
      date: (n.date && Object.prototype.toString.call(n.date) === '[object Date]') ? (n.date as unknown as Date).toISOString() : String(n.date),
    }));

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
