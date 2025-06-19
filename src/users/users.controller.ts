import { Controller, Get, Put, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }

  @Put('me')
  updateProfile(@Request() req, @Body() body) {
    return this.usersService.update(req.user.sub, body);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}

