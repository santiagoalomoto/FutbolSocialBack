import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { UserPreferencesService } from './user-preferences.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserPreferencesResponseDto } from './dto/user-preferences-response.dto';

@ApiTags('user-preferences')
@ApiBearerAuth()
@Controller('preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(private readonly service: UserPreferencesService) {}

  // (opcional) este POST lo puedes omitir si solo usas el PUT con upsert

  @Post()
  @ApiResponse({ status: 201, type: UserPreferencesResponseDto })
  create(@Request() req, @Body() body): Promise<UserPreferencesResponseDto> {
    return this.service.create({ ...body, userId: req.user.userId });
  }


  @Get('me')
  @ApiResponse({ status: 200, type: UserPreferencesResponseDto })
  getMyPreferences(@Request() req): Promise<UserPreferencesResponseDto> {
    return this.service.findByUserId(req.user.userId);
  }


  @Put('me')
  @ApiResponse({ status: 200, type: UserPreferencesResponseDto })
  updateMyPreferences(@Request() req, @Body() body): Promise<UserPreferencesResponseDto> {
    return this.service.updateByUserId(req.user.userId, body);
  }
}
