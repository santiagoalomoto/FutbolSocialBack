import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../../entities/team.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private repo: Repository<Team>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<Team>) {
    this.logger.log('Creating a new team');
    const team = this.repo.create(data);
    return this.repo.save(team);
  }

  findAll() {
    this.logger.log('Retrieving all teams');
    return this.repo.find();
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving team with id: ${id}`);
    const team = await this.repo.findOne({ where: { id } });
    if (!team) {
      this.logger.warn(`Team with id ${id} not found`);
      throw new NotFoundException('Equipo no encontrado');
    }
    return team;
  }

  async update(id: number, data: Partial<Team>) {
    this.logger.log(`Updating team with id: ${id}`);
    const team = await this.findOne(id);
    Object.assign(team, data);
    return this.repo.save(team);
  }

  async delete(id: number) {
    this.logger.log(`Deleting team with id: ${id}`);
    const team = await this.findOne(id);
    return this.repo.remove(team);
  }
}
