import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({
    example: {
      id: 1,
      email: 'user@email.com',
      role: 'user',
      name: 'Nombre',
    },
  })
  user: {
    id: number;
    email: string;
    role: string;
    name?: string;
  };
}
