import { ApiProperty } from '@nestjs/swagger';

class TeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo_url: string;

  @ApiProperty()
  division: string;
}

export class PlayerResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  photo_url: string;

  @ApiProperty({ type: TeamDto, nullable: true })
  team: TeamDto | null;

  @ApiProperty()
  position: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  goals: number;

  @ApiProperty()
  yellow_cards: number;

  @ApiProperty()
  red_cards: number;
}
