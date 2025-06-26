
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminDashboardResponseDto } from './dto/admin-dashboard-response.dto';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  @Roles('admin')
  @Get('dashboard')
  @ApiResponse({ status: 200, type: AdminDashboardResponseDto })
  async dashboard(): Promise<AdminDashboardResponseDto> {
    return this.adminService.getDashboardData();
  }
}
