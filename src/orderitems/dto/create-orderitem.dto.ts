import { IsDecimal, IsInt } from 'class-validator';

export class CreateOrderitemDto {
  @IsInt()
  orderId: number;
  @IsInt()
  dishId: number;
  @IsInt()
  quantity: number;
  @IsDecimal()
  price: number;
}
