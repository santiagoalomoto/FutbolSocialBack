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
    return this.repo.find();
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
