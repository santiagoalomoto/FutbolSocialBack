import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private repo: Repository<News>,
  ) {}

  create(data: Partial<News>) {
    const noticia = this.repo.create(data);
    return this.repo.save(noticia);
  }

  findAll() {
    return this.repo.find({ relations: ['match'], order: { date: 'DESC' } });
  }

  async findOne(id: number) {
    const noticia = await this.repo.findOne({ where: { id }, relations: ['match'] });
    if (!noticia) throw new NotFoundException('Noticia no encontrada');
    return noticia;
  }

  async update(id: number, data: Partial<News>) {
    const noticia = await this.findOne(id);
    Object.assign(noticia, data);
    return this.repo.save(noticia);
  }

  async delete(id: number) {
    const noticia = await this.findOne(id);
    return this.repo.remove(noticia);
  }
}