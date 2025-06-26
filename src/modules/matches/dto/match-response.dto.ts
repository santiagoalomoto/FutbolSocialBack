import { ApiProperty } from '@nestjs/swagger';

export class MatchResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  league: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ required: false })
  team1?: number;

  @ApiProperty({ required: false })
  team2?: number;

  @ApiProperty()
  score_team1: number;

  @ApiProperty()
  score_team2: number;
}
