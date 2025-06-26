import { IsString, IsOptional } from 'class-validator';

export class UpdateRefereeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nationality?: string;
}
