import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private repo: Repository<Player>,
  ) {}

  create(data: Partial<Player>) {
    const player = this.repo.create(data);
    return this.repo.save(player);
  }

  findAll() {
    return this.repo.find({ relations: ['team'] });
  }

  async findOne(id: number) {
    const player = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!player) throw new NotFoundException('Jugador no encontrado');
    return player;
  }

  async update(id: number, data: Partial<Player>) {
    const player = await this.findOne(id);
    Object.assign(player, data);
    return this.repo.save(player);
  }

  async delete(id: number) {
    const player = await this.findOne(id);
    return this.repo.remove(player);
  }
}
