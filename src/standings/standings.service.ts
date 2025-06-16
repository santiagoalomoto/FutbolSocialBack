import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standing } from './standing.entity';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private repo: Repository<Standing>,
  ) {}

  create(data: Partial<Standing>) {
    const standing = this.repo.create(data);
    return this.repo.save(standing);
  }

  findAll() {
    return this.repo.find({ relations: ['team'], order: { points: 'DESC' } });
  }

  async findOne(id: number) {
    const standing = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!standing) throw new NotFoundException('Registro no encontrado');
    return standing;
  }

  async update(id: number, data: Partial<Standing>) {
    const standing = await this.findOne(id);
    Object.assign(standing, data);
    return this.repo.save(standing);
  }

  async delete(id: number) {
    const standing = await this.findOne(id);
    return this.repo.remove(standing);
  }
}
