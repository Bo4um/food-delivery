import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateRestaurantDto) {
    const restaurantInDb = await this.prisma.restaurant.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (restaurantInDb) {
      throw new ForbiddenException('This name is already in use');
    }
    return this.prisma.restaurant.create({
      data: {
        name: dto.name,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        rating: dto.rating,
      },
    });
  }

  async findAll() {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: number) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id = ${id} was not found`);
    }
    return restaurant;
  }

  async update(id: number, dto: UpdateRestaurantDto) {
    const restInDb = await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
    if (!restInDb) {
      throw new NotFoundException(`Restaurant with id = ${id} was not found`);
    }
    return this.prisma.restaurant.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.restaurant
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Restaurant with id = ${id} was not found`);
      });
  }
}
