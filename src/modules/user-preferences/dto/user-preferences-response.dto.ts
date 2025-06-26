import { ApiProperty } from '@nestjs/swagger';

export class UserPreferencesResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ required: false })
  theme?: string;

  @ApiProperty({ required: false })
  color?: string;

  @ApiProperty({ required: false })
  font?: string;

  @ApiProperty({ required: false })
  backgroundImage?: string;
}
