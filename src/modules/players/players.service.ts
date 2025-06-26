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

  async create(data: Partial<Player>) {
    this.logger.log('Creating a new player');
    const player = this.repo.create(data);
    const saved = await this.repo.save(player);
    return this.toResponseDto(saved);
  }

  async findAll() {
    this.logger.log('Retrieving all players');
    const players = await this.repo.find({ relations: ['team'] });
    return players.map(p => this.toResponseDto(p));
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving player with id: ${id}`);
    const player = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!player) {
      this.logger.warn(`Player with id ${id} not found`);
      throw new NotFoundException('Jugador no encontrado');
    }
    return this.toResponseDto(player);
  }

  async update(id: number, data: Partial<Player>) {
    this.logger.log(`Updating player with id: ${id}`);
    const player = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!player) {
      this.logger.warn(`Player with id ${id} not found`);
      throw new NotFoundException('Jugador no encontrado');
    }
    Object.assign(player, data);
    const updated = await this.repo.save(player);
    return this.toResponseDto(updated);
  }

  async delete(id: number) {
    this.logger.log(`Deleting player with id: ${id}`);
    const player = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!player) {
      this.logger.warn(`Player with id ${id} not found`);
      throw new NotFoundException('Jugador no encontrado');
    }
    await this.repo.remove(player);
    return this.toResponseDto(player);
  }

  private toResponseDto(player: Player) {
    return {
      id: player.id,
      name: player.name,
      photo_url: player.photo_url,
      team: player.team ? player.team.id : undefined,
      position: player.position,
      number: player.number,
      goals: player.goals,
      yellow_cards: player.yellow_cards,
      red_cards: player.red_cards,
    };
  }
}
