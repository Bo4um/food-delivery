import { ApiProperty } from '@nestjs/swagger';

export class DtoAuthResponse {
  @ApiProperty({ example: 'jwttoken....' })
  accessToken: string;
}
