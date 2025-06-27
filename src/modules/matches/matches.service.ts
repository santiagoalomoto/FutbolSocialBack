import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../entities/match.entity';
import { LoggerService } from '../../logger/logger.service'; // importa el LoggerService

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private repo: Repository<Match>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) { }

  async create(data: Partial<Match>) {
    this.logger.log('Creating a new match');
    const match = this.repo.create(data);
    const saved = await this.repo.save(match);
    return this.toResponseDto(saved);
  }

  async findAll() {
    this.logger.log('Retrieving all matches');
    const matches = await this.repo.find({ relations: ['team1', 'team2'] });
    return matches.map(m => this.toResponseDto(m));
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving match with id: ${id}`);
    const match = await this.repo.findOne({ where: { id }, relations: ['team1', 'team2'] });
    if (!match) {
      this.logger.warn(`Match with id ${id} not found`);
      throw new NotFoundException('Partido no encontrado');
    }
    return this.toResponseDto(match);
  }

  async update(id: number, data: Partial<Match>) {
    this.logger.log(`Updating match with id: ${id}`);
    const match = await this.repo.findOne({ where: { id }, relations: ['team1', 'team2'] });
    if (!match) {
      this.logger.warn(`Match with id ${id} not found`);
      throw new NotFoundException('Partido no encontrado');
    }
    Object.assign(match, data);
    const updated = await this.repo.save(match);
    return this.toResponseDto(updated);
  }

  async delete(id: number) {
    this.logger.log(`Deleting match with id: ${id}`);
    const match = await this.repo.findOne({ where: { id }, relations: ['team1', 'team2'] });
    if (!match) {
      this.logger.warn(`Match with id ${id} not found`);
      throw new NotFoundException('Partido no encontrado');
    }
    await this.repo.remove(match);
    return this.toResponseDto(match);
  }

  private toResponseDto(match: Match) {
    return {
      id: match.id,
      league: match.league,
      date: match.date,
      time: match.time,
      status: match.status,
      team1: match.team1
        ? { id: match.team1.id, name: match.team1.name }
        : undefined,
      team2: match.team2
        ? { id: match.team2.id, name: match.team2.name }
        : undefined,
      score_team1: match.score_team1,
      score_team2: match.score_team2,
    };
  }
}
