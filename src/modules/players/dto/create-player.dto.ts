import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  team?: string;
}
