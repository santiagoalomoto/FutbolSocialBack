import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
    // Login con datos originales para obtener token
    return this.login({ email: data.email, password: data.password });
  }

  async login(userData) {
    const user = await this.usersService.findByEmail(userData.email);
    if (!user) throw new UnauthorizedException('Email no registrado');

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
