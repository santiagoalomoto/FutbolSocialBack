import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../../logger/logger.service'; // importa LoggerService

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private repo: Repository<User>,

    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  async create(data: Partial<User>) {
    this.logger.log('Creating a new user');
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    this.logger.log(`Finding user by email: ${email}`);
    return this.repo.findOne({ where: { email } });
  }

  findAll() {
    this.logger.log('Retrieving all users');
    return this.repo.find({
      select: ['id', 'email', 'role', 'name'],
    });
  }

  findById(id: number) {
    this.logger.log(`Finding user by id: ${id}`);
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<User>) {
    this.logger.log(`Updating user with id: ${id}`);
    const user = await this.findById(id);
    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException('Usuario no encontrado');
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        this.logger.warn(`Email ${data.email} is already in use`);
        throw new BadRequestException('El correo ya está en uso');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return this.repo.save(user);
  }
}
