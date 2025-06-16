import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private repo: Repository<Match>,
  ) {}

  create(data: Partial<Match>) {
    const match = this.repo.create(data);
    return this.repo.save(match);
  }

  findAll() {
    return this.repo.find({ relations: ['team1', 'team2'] });
  }

  async findOne(id: number) {
    const match = await this.repo.findOne({ where: { id }, relations: ['team1', 'team2'] });
    if (!match) throw new NotFoundException('Partido no encontrado');
    return match;
  }

  async update(id: number, data: Partial<Match>) {
    const match = await this.findOne(id);
    Object.assign(match, data);
    return this.repo.save(match);
  }

  async delete(id: number) {
    const match = await this.findOne(id);
    return this.repo.remove(match);
  }
}
