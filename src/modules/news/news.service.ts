import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from 'src/entities/news.entity';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private repo: Repository<News>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  create(data: Partial<News>) {
    this.logger.log('Creating a new news item');
    const noticia = this.repo.create(data);
    return this.repo.save(noticia);
  }

  findAll() {
    this.logger.log('Retrieving all news items');
    return this.repo.find({ relations: ['match'], order: { date: 'DESC' } });
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving news item with id: ${id}`);
    const noticia = await this.repo.findOne({ where: { id }, relations: ['match'] });
    if (!noticia) {
      this.logger.warn(`News item with id ${id} not found`);
      throw new NotFoundException('Noticia no encontrada');
    }
    return noticia;
  }

  async update(id: number, data: Partial<News>) {
    this.logger.log(`Updating news item with id: ${id}`);
    const noticia = await this.findOne(id);
    Object.assign(noticia, data);
    return this.repo.save(noticia);
  }

  async delete(id: number) {
    this.logger.log(`Deleting news item with id: ${id}`);
    const noticia = await this.findOne(id);
    return this.repo.remove(noticia);
  }
}
