import { IsString, IsOptional } from 'class-validator';

export class CreateUserPreferenceDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  favoriteTeam?: string;
}
