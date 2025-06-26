import { ApiProperty } from '@nestjs/swagger';

export class TeamResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  logo_url?: string;

  @ApiProperty()
  division: string;
}
