import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'miClaveSecretaMuySegura',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.id || payload.sub, // 👈 este nombre debe coincidir con el del controller
      email: payload.email,
      role: payload.role,
    };
  }
}

