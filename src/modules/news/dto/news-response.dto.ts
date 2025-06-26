import { ApiProperty } from '@nestjs/swagger';

export class NewsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image_url?: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ required: false })
  match?: number;
}
