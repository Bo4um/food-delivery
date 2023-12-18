import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        dateTime: dto.dateTime,
        status: dto.status,
        totalPrice: dto.totalPrice,
        restaurantId: dto.restaurantId,
        userId: dto.userId,
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id = ${id} was not found`);
    }
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const orderInDb = await this.prisma.order.findUnique({
      where: {
        id: id,
      },
    });
    if (!orderInDb) {
      throw new NotFoundException(`Order with id = ${id} was not found`);
    }
    return this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.order
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Order with id = ${id} was not found`);
      });
  }
}
