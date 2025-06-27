import { ApiProperty } from '@nestjs/swagger';

class TeamBasicInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

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

  @ApiProperty({ required: false, type: () => TeamBasicInfo })
  team1?: TeamBasicInfo;

  @ApiProperty({ required: false, type: () => TeamBasicInfo })
  team2?: TeamBasicInfo;

  @ApiProperty()
  score_team1: number;

  @ApiProperty()
  score_team2: number;
}
