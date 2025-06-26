
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referee } from '../../entities/referee.entity';
import { LoggerService } from '../../logger/logger.service';
import { RefereeResponseDto } from './dto/referee-response.dto';

@Injectable()
export class RefereesService {
  constructor(
    @InjectRepository(Referee)
    private repo: Repository<Referee>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}


  async create(data: Partial<Referee>): Promise<RefereeResponseDto> {
    this.logger.log('Creating a new referee');
    const referee = this.repo.create(data);
    const saved = await this.repo.save(referee);
    return this.toResponseDto(saved);
  }


  async findAll(): Promise<RefereeResponseDto[]> {
    this.logger.log('Retrieving all referees');
    const referees = await this.repo.find();
    return referees.map(r => this.toResponseDto(r));
  }


  async findOne(id: number): Promise<RefereeResponseDto> {
    this.logger.log(`Retrieving referee with id: ${id}`);
    const referee = await this.repo.findOne({ where: { id } });
    if (!referee) {
      this.logger.warn(`Referee with id ${id} not found`);
      throw new NotFoundException('Árbitro no encontrado');
    }
    return this.toResponseDto(referee);
  }


  async update(id: number, data: Partial<Referee>): Promise<RefereeResponseDto> {
    this.logger.log(`Updating referee with id: ${id}`);
    const referee = await this.repo.findOne({ where: { id } });
    if (!referee) {
      this.logger.warn(`Referee with id ${id} not found`);
      throw new NotFoundException('Árbitro no encontrado');
    }
    Object.assign(referee, data);
    const saved = await this.repo.save(referee);
    return this.toResponseDto(saved);
  }

  async delete(id: number): Promise<RefereeResponseDto> {
    this.logger.log(`Deleting referee with id: ${id}`);
    const referee = await this.repo.findOne({ where: { id } });
    if (!referee) {
      this.logger.warn(`Referee with id ${id} not found`);
      throw new NotFoundException('Árbitro no encontrado');
    }
    await this.repo.remove(referee);
    return this.toResponseDto(referee);
  }

  private toResponseDto(referee: Referee): RefereeResponseDto {
    const { id, name, photo_url, city, gender, roles, yellow_cards, red_cards } = referee;
    return { id, name, photo_url, city, gender, roles, yellow_cards, red_cards };
  }
}
