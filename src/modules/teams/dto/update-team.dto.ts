import { IsString, IsOptional } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  coach?: string;
}
