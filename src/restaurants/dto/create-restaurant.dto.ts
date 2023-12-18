import { IsDecimal, IsPhoneNumber, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsPhoneNumber('BY')
  phoneNumber: string;
  @IsDecimal()
  rating: number;
}
