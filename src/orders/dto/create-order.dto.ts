import { IsDateString, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsDateString()
  dateTime: Date;
  @IsString()
  status: string;
  @IsDecimal()
  totalPrice: number;
  @IsInt()
  restaurantId: number;
  @IsInt()
  userId: number;
}
