import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardTotalsDto {
  @ApiProperty()
  users: number;
  @ApiProperty()
  players: number;
  @ApiProperty()
  teams: number;
  @ApiProperty()
  matches: number;
  @ApiProperty()
  referees: number;
  @ApiProperty()
  news: number;
}

export class AdminDashboardRecentUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
}

export class AdminDashboardRecentMatchDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  date: string;
  @ApiProperty()
  league: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  team1: any;
  @ApiProperty()
  team2: any;
}

export class AdminDashboardRecentRefereeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class AdminDashboardRecentNewsDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  date: string;
}

export class AdminDashboardRecentDto {
  @ApiProperty({ type: [AdminDashboardRecentUserDto] })
  users: AdminDashboardRecentUserDto[];
  @ApiProperty({ type: [AdminDashboardRecentMatchDto] })
  matches: AdminDashboardRecentMatchDto[];
  @ApiProperty({ type: [AdminDashboardRecentRefereeDto] })
  referees: AdminDashboardRecentRefereeDto[];
  @ApiProperty({ type: [AdminDashboardRecentNewsDto] })
  news: AdminDashboardRecentNewsDto[];
}

export class AdminDashboardResponseDto {
  @ApiProperty({ type: AdminDashboardTotalsDto })
  totals: AdminDashboardTotalsDto;
  @ApiProperty({ type: AdminDashboardRecentDto })
  recent: AdminDashboardRecentDto;
}
