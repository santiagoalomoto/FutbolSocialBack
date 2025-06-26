import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateStandingDto {
  @IsOptional()
  @IsString()
  team?: string;

  @IsOptional()
  @IsInt()
  points?: number;
}
