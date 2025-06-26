// user-preferences.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(private readonly service: UserPreferencesService) {}

  // (opcional) este POST lo puedes omitir si solo usas el PUT con upsert
  @Post()
  create(@Request() req, @Body() body) {
    return this.service.create({ ...body, userId: req.user.userId });
  }

  @Get('me')
  getMyPreferences(@Request() req) {
    return this.service.findByUserId(req.user.userId);
  }

  @Put('me')
  updateMyPreferences(@Request() req, @Body() body) {
    return this.service.updateByUserId(req.user.userId, body);
  }
}
