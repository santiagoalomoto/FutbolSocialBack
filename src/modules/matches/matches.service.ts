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
  ) {}

  create(data: Partial<Match>) {
    this.logger.log('Creating a new match');
    const match = this.repo.create(data);
    return this.repo.save(match);
  }

  findAll() {
    this.logger.log('Retrieving all matches');
    return this.repo.find({ relations: ['team1', 'team2'] });
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving match with id: ${id}`);
    const match = await this.repo.findOne({ where: { id }, relations: ['team1', 'team2'] });
    if (!match) {
      this.logger.warn(`Match with id ${id} not found`);
      throw new NotFoundException('Partido no encontrado');
    }
    return match;
  }

  async update(id: number, data: Partial<Match>) {
    this.logger.log(`Updating match with id: ${id}`);
    const match = await this.findOne(id);
    Object.assign(match, data);
    return this.repo.save(match);
  }

  async delete(id: number) {
    this.logger.log(`Deleting match with id: ${id}`);
    const match = await this.findOne(id);
    return this.repo.remove(match);
  }
}
