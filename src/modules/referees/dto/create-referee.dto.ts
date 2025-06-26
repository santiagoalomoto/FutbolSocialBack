import { IsString, IsOptional } from 'class-validator';

export class CreateRefereeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nationality?: string;
}
