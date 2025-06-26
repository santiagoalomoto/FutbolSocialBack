import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standing } from '../../entities/standing.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private repo: Repository<Standing>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<Standing>) {
    this.logger.log('Creating a new standing record');
    const standing = this.repo.create(data);
    return this.repo.save(standing);
  }

  findAll() {
    this.logger.log('Retrieving all standings');
    return this.repo.find({ relations: ['team'], order: { points: 'DESC' } });
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving standing record with id: ${id}`);
    const standing = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!standing) {
      this.logger.warn(`Standing record with id ${id} not found`);
      throw new NotFoundException('Registro no encontrado');
    }
    return standing;
  }

  async update(id: number, data: Partial<Standing>) {
    this.logger.log(`Updating standing record with id: ${id}`);
    const standing = await this.findOne(id);
    Object.assign(standing, data);
    return this.repo.save(standing);
  }

  async delete(id: number) {
    this.logger.log(`Deleting standing record with id: ${id}`);
    const standing = await this.findOne(id);
    return this.repo.remove(standing);
  }
}
