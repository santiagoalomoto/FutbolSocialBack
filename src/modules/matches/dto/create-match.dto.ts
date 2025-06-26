import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  homeTeam: string;

  @IsString()
  awayTeam: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsInt()
  homeScore?: number;

  @IsOptional()
  @IsInt()
  awayScore?: number;
}
