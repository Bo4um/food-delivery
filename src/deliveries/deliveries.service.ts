import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateDeliveryDto) {
    return this.prisma.delivery.create({
      data: {
        orderId: dto.orderId,
        method: dto.method,
        price: dto.price,
        address: dto.address,
        recipientName: dto.recipientName,
        recipientPhoneNumber: dto.recipientPhoneNumber,
      },
    });
  }

  async findAll() {
    return this.prisma.delivery.findMany();
  }

  async findOne(id: number) {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id: id,
      },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with id = ${id} was not found`);
    }
    return delivery;
  }

  async update(id: number, dto: UpdateDeliveryDto) {
    const deliveryInDb = await this.prisma.delivery.findUnique({
      where: {
        id: id,
      },
    });
    if (!deliveryInDb) {
      throw new NotFoundException(`Delivery with id = ${id} was not found`);
    }
    return this.prisma.delivery.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.delivery
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Delivery with id = ${id} was not found`);
      });
  }
}
