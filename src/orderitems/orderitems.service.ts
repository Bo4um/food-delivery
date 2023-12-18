import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderitemsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateOrderitemDto) {
    return this.prisma.orderItem.create({
      data: {
        dishId: dto.dishId,
        orderId: dto.orderId,
        quantity: dto.quantity,
        price: dto.price,
      },
    });
  }

  async findAll() {
    return this.prisma.orderItem.findMany();
  }

  async findOne(id: number) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: {
        id: id,
      },
    });
    if (!orderItem) {
      throw new NotFoundException(`Order item with id = ${id} was not found`);
    }
    return orderItem;
  }

  async update(id: number, dto: UpdateOrderitemDto) {
    const orderItemInDb = await this.prisma.orderItem.findUnique({
      where: {
        id: id,
      },
    });
    if (!orderItemInDb) {
      throw new NotFoundException(`Order item with id = ${id} was not found`);
    }
    return this.prisma.orderItem.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.orderItem
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Order item with id = ${id} was not found`);
      });
  }
}
