import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findAll() {
    // Solo campos públicos, sin password
    return this.repo.find({
      select: ['id', 'email', 'role', 'name'],
    });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    Object.assign(user, data);
    return this.repo.save(user);
  }
}
