import { IsString, IsInt } from 'class-validator';

export class CreateStandingDto {
  @IsString()
  team: string;

  @IsInt()
  points: number;
}
