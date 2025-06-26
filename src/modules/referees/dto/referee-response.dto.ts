import { ApiProperty } from '@nestjs/swagger';

export class RefereeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  photo_url?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  gender: string;

  @ApiProperty({ type: [String] })
  roles: string[];

  @ApiProperty()
  yellow_cards: number;

  @ApiProperty()
  red_cards: number;
}
