import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referee } from './referee.entity';

@Injectable()
export class RefereesService {
  constructor(
    @InjectRepository(Referee)
    private repo: Repository<Referee>,
  ) {}

  create(data: Partial<Referee>) {
    const referee = this.repo.create(data);
    return this.repo.save(referee);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const referee = await this.repo.findOne({ where: { id } });
    if (!referee) throw new NotFoundException('Árbitro no encontrado');
    return referee;
  }

  async update(id: number, data: Partial<Referee>) {
    const referee = await this.findOne(id);
    Object.assign(referee, data);
    return this.repo.save(referee);
  }

  async delete(id: number) {
    const referee = await this.findOne(id);
    return this.repo.remove(referee);
  }
}
