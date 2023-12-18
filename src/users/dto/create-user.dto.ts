import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'First name' })
  firstName: string;
  @IsString()
  @ApiProperty({ example: 'Last name' })
  lastName: string;
  @IsEmail()
  @ApiProperty({ example: 'somemail@mail.com' })
  email: string;
  @IsPhoneNumber('BY')
  @ApiProperty({ example: '+375331234567' })
  phoneNumber: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({ example: 'strong password' })
  password: string;
}
