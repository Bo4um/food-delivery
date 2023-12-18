import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDecimal()
  price: number;
  @IsInt()
  restaurantId: number;
}
