import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsInt()
  orderId: number;
  @IsString()
  method: string;
  @IsDecimal()
  price: number;
  @IsString()
  address: string;
  @IsString()
  recipientName: string;
  @IsString()
  recipientPhoneNumber: string;
}
