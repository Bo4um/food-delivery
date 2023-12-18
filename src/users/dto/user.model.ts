import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({ example: '1' })
  id: number;
  @ApiProperty({ example: 'First name' })
  firstName: string;
  @ApiProperty({ example: 'Last name' })
  lastName: string;
  @ApiProperty({ example: 'somemail@mail.com' })
  email: string;
  @ApiProperty({ example: '+375331234567' })
  phoneNumber: string;
  @ApiProperty({ example: 'strong password' })
  password: string;
}
