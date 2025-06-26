import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CryptoService } from '../../shared/crypto.service';
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
    // Cifrar los campos excepto id
    const user = this.repo.create({
      ...data,
      emailHash: data.email ? CryptoService.hash(data.email) : undefined,
      email: data.email ? CryptoService.encrypt(data.email) : undefined,
      password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
      role: data.role ? CryptoService.encrypt(data.role) : undefined,
      name: data.name ? CryptoService.encrypt(data.name) : undefined,
    });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    this.logger.log(`Finding user by email: ${email}`);
    // Buscar por hash de email
    const emailHash = CryptoService.hash(email);
    const user = await this.repo.findOne({ where: { emailHash } });
    return user ? this.decryptUser(user) : null;
  }

  async findAll() {
    this.logger.log('Retrieving all users');
    const users = await this.repo.find();
    return users.map(u => this.decryptUser(u));
  }

  async findById(id: number) {
    this.logger.log(`Finding user by id: ${id}`);
    const user = await this.repo.findOne({ where: { id } });
    return user ? this.decryptUser(user) : null;
  }

  async update(id: number, data: Partial<User>) {
    this.logger.log(`Updating user with id: ${id}`);
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si se actualiza el email, cifrarlo
    if (data.email) {
      data.emailHash = CryptoService.hash(data.email);
      data.email = CryptoService.encrypt(data.email);
    }
    // Si se actualiza el password, hashearlo
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    // Si se actualiza el role, cifrarlo
    if (data.role) {
      data.role = CryptoService.encrypt(data.role);
    }
    // Si se actualiza el name, cifrarlo
    if (data.name) {
      data.name = CryptoService.encrypt(data.name);
    }

    Object.assign(user, data);
    const updated = await this.repo.save(user);
    return this.decryptUser(updated);
  }

  // Método para descifrar los campos del usuario
  private decryptUser(user: User): any {
    return {
      ...user,
      email: user.email ? CryptoService.decrypt(user.email) : undefined,
      role: user.role ? CryptoService.decrypt(user.role) : undefined,
      name: user.name ? CryptoService.decrypt(user.name) : undefined,
      // password no se descifra nunca
    };
  }
}
