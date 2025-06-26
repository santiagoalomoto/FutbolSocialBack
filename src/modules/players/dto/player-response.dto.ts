import { ApiProperty } from '@nestjs/swagger';

export class PlayerResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  photo_url?: string;

  @ApiProperty({ type: () => Number, required: false })
  team?: number;

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
