import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orderitems')
@UseGuards(JwtAuthGuard)
export class OrderitemsController {
  constructor(private readonly orderitemsService: OrderitemsService) {}

  @Post()
  create(@Body() createOrderitemDto: CreateOrderitemDto) {
    return this.orderitemsService.create(createOrderitemDto);
  }

  @Get()
  findAll() {
    return this.orderitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderitemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderitemDto: UpdateOrderitemDto,
  ) {
    return this.orderitemsService.update(+id, updateOrderitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderitemsService.remove(+id);
  }
}
