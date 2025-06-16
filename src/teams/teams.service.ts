import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repo: Repository<Team>,
  ) {}

  create(data: Partial<Team>) {
    const team = this.repo.create(data);
    return this.repo.save(team);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const team = await this.repo.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Equipo no encontrado');
    return team;
  }

  async update(id: number, data: Partial<Team>) {
    const team = await this.findOne(id);
    Object.assign(team, data);
    return this.repo.save(team);
  }

  async delete(id: number) {
    const team = await this.findOne(id);
    return this.repo.remove(team);
  }
}
