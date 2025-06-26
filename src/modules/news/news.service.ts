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

  async create(data: Partial<News>) {
    this.logger.log('Creating a new news item');
    const noticia = this.repo.create(data);
    const saved = await this.repo.save(noticia);
    return this.toResponseDto(saved);
  }

  async findAll() {
    this.logger.log('Retrieving all news items');
    const news = await this.repo.find({ relations: ['match'], order: { date: 'DESC' } });
    return news.map(n => this.toResponseDto(n));
  }

  async findOne(id: number) {
    this.logger.log(`Retrieving news item with id: ${id}`);
    const noticia = await this.repo.findOne({ where: { id }, relations: ['match'] });
    if (!noticia) {
      this.logger.warn(`News item with id ${id} not found`);
      throw new NotFoundException('Noticia no encontrada');
    }
    return this.toResponseDto(noticia);
  }

  async update(id: number, data: Partial<News>) {
    this.logger.log(`Updating news item with id: ${id}`);
    const noticia = await this.repo.findOne({ where: { id }, relations: ['match'] });
    if (!noticia) {
      this.logger.warn(`News item with id ${id} not found`);
      throw new NotFoundException('Noticia no encontrada');
    }
    Object.assign(noticia, data);
    const updated = await this.repo.save(noticia);
    return this.toResponseDto(updated);
  }

  async delete(id: number) {
    this.logger.log(`Deleting news item with id: ${id}`);
    const noticia = await this.repo.findOne({ where: { id }, relations: ['match'] });
    if (!noticia) {
      this.logger.warn(`News item with id ${id} not found`);
      throw new NotFoundException('Noticia no encontrada');
    }
    await this.repo.remove(noticia);
    return this.toResponseDto(noticia);
  }

  private toResponseDto(news: News) {
    return {
      id: news.id,
      title: news.title,
      description: news.description,
      image_url: news.image_url,
      date: news.date,
      match: news.match ? news.match.id : undefined,
    };
  }
}
