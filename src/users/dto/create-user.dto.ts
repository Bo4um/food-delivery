import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('BY')
  phoneNumber: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
