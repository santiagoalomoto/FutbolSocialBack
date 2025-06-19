import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPreferencesService } from './user-preferences.service';

@Controller('preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(private readonly service: UserPreferencesService) {}

  @Get()
  getPreferences(@Request() req) {
    return this.service.getByUserId(req.user.id);
  }

  @Put()
  updatePreferences(@Request() req, @Body() body) {
    return this.service.createOrUpdate(req.user.id, body);
  }
}
