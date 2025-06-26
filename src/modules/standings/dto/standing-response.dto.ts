import { ApiProperty } from '@nestjs/swagger';
import { TeamResponseDto } from '../../teams/dto/team-response.dto';

export class StandingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: () => TeamResponseDto })
  team: TeamResponseDto;

  @ApiProperty()
  played: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  draws: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  goals_for: number;

  @ApiProperty()
  goals_against: number;

  @ApiProperty()
  goal_diff: number;

  @ApiProperty()
  points: number;

  @ApiProperty({ required: false })
  position?: number;
}
