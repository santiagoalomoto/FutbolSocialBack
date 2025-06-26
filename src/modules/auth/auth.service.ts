import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CryptoService } from '../../shared/crypto.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoggerService } from 'src/logger/logger.service';// importa LoggerService

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: LoggerService, // inyecta LoggerService
  ) {}

  async register(data: RegisterDto) {
    this.logger.log(`Registering user with email: ${data.email}`);
    // El usersService.create ya cifra los campos, solo hasheamos password aquí por seguridad
    const user = await this.usersService.create({
      ...data,
      password: data.password, // el service lo hashea y cifra los demás campos
    });
    return this.login({ email: data.email, password: data.password });
  }

  async login(data: LoginDto) {
    this.logger.log(`Attempting login for email: ${data.email}`);
    // Buscar usuario por email cifrado
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      this.logger.warn(`Login failed: Email not registered - ${data.email}`);
      throw new UnauthorizedException('Email no registrado');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      this.logger.warn(`Login failed: Incorrect password for email - ${data.email}`);
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // El usersService.findByEmail ya descifra los campos
    const payload = { sub: user.id, email: user.email, role: user.role };
    this.logger.log(`User logged in successfully: ${data.email}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
