import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'somemail@mail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'strong password' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
