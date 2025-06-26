import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entities/player.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private repo: Repository<Player>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<Player>) {
    this.logger.log('Creating a new player');
    const player = this.repo.create(data);
    return this.repo.save(player);
  }

  findAll() {
    this.logger.log('Retrieving all players');
    return this.repo.find({ relations: ['team'] });
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving player with id: ${id}`);
    const player = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!player) {
      this.logger.warn(`Player with id ${id} not found`);
      throw new NotFoundException('Jugador no encontrado');
    }
    return player;
  }

  async update(id: number, data: Partial<Player>) {
    this.logger.log(`Updating player with id: ${id}`);
    const player = await this.findOne(id);
    Object.assign(player, data);
    return this.repo.save(player);
  }

  async delete(id: number) {
    this.logger.log(`Deleting player with id: ${id}`);
    const player = await this.findOne(id);
    return this.repo.remove(player);
  }
}
