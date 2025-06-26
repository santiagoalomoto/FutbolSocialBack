import { IsString, IsOptional } from 'class-validator';

export class UpdateUserPreferenceDto {
  @IsOptional()
  @IsString()
  favoriteTeam?: string;
}
