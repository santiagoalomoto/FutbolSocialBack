
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Standing } from '../../entities/standing.entity';
import { LoggerService } from '../../logger/logger.service';
import { StandingResponseDto } from './dto/standing-response.dto';
import { TeamResponseDto } from '../teams/dto/team-response.dto';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private repo: Repository<Standing>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}


  async create(data: Partial<Standing>): Promise<StandingResponseDto> {
    this.logger.log('Creating a new standing record');
    const standing = this.repo.create(data);
    const saved = await this.repo.save(standing);
    return this.toResponseDto(saved);
  }


  async findAll(): Promise<StandingResponseDto[]> {
    this.logger.log('Retrieving all standings');
    const standings = await this.repo.find({ relations: ['team'], order: { points: 'DESC' } });
    return standings.map(s => this.toResponseDto(s));
  }


  async findOne(id: number): Promise<StandingResponseDto> {
    this.logger.log(`Retrieving standing record with id: ${id}`);
    const standing = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!standing) {
      this.logger.warn(`Standing record with id ${id} not found`);
      throw new NotFoundException('Registro no encontrado');
    }
    return this.toResponseDto(standing);
  }


  async update(id: number, data: Partial<Standing>): Promise<StandingResponseDto> {
    this.logger.log(`Updating standing record with id: ${id}`);
    const standing = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!standing) {
      this.logger.warn(`Standing record with id ${id} not found`);
      throw new NotFoundException('Registro no encontrado');
    }
    Object.assign(standing, data);
    const saved = await this.repo.save(standing);
    return this.toResponseDto(saved);
  }

  async delete(id: number): Promise<StandingResponseDto> {
    this.logger.log(`Deleting standing record with id: ${id}`);
    const standing = await this.repo.findOne({ where: { id }, relations: ['team'] });
    if (!standing) {
      this.logger.warn(`Standing record with id ${id} not found`);
      throw new NotFoundException('Registro no encontrado');
    }
    await this.repo.remove(standing);
    return this.toResponseDto(standing);
  }

  private toResponseDto(standing: Standing): StandingResponseDto {
    const { id, team, played, wins, draws, losses, goals_for, goals_against, goal_diff, points, position } = standing;
    return {
      id,
      team: team
        ? {
            id: team.id,
            name: team.name,
            logo_url: team.logo_url,
            division: team.division,
          } as TeamResponseDto
        : ({} as TeamResponseDto),
      played,
      wins,
      draws,
      losses,
      goals_for,
      goals_against,
      goal_diff,
      points,
      position,
    };
  }
}
