import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referee } from '../../entities/referee.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class RefereesService {
  constructor(
    @InjectRepository(Referee)
    private repo: Repository<Referee>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<Referee>) {
    this.logger.log('Creating a new referee');
    const referee = this.repo.create(data);
    return this.repo.save(referee);
  }

  findAll() {
    this.logger.log('Retrieving all referees');
    return this.repo.find();
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving referee with id: ${id}`);
    const referee = await this.repo.findOne({ where: { id } });
    if (!referee) {
      this.logger.warn(`Referee with id ${id} not found`);
      throw new NotFoundException('Árbitro no encontrado');
    }
    return referee;
  }

  async update(id: number, data: Partial<Referee>) {
    this.logger.log(`Updating referee with id: ${id}`);
    const referee = await this.findOne(id);
    Object.assign(referee, data);
    return this.repo.save(referee);
  }

  async delete(id: number) {
    this.logger.log(`Deleting referee with id: ${id}`);
    const referee = await this.findOne(id);
    return this.repo.remove(referee);
  }
}
