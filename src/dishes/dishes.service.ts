import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateDishDto) {
    const dishInDb = await this.prisma.dish.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (dishInDb) {
      throw new ForbiddenException('This name is already in use');
    }
    return this.prisma.dish.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        restaurantId: dto.restaurantId,
      },
    });
  }

  async findAll() {
    return this.prisma.dish.findMany();
  }

  async findOne(id: number) {
    const dish = await this.prisma.dish.findUnique({
      where: {
        id: id,
      },
    });
    if (!dish) {
      throw new NotFoundException(`Dish with id = ${id} was not found`);
    }
    return dish;
  }

  async update(id: number, dto: UpdateDishDto) {
    const dishInDb = await this.prisma.dish.findUnique({
      where: {
        id: id,
      },
    });
    if (!dishInDb) {
      throw new NotFoundException(`Restaurant with id = ${id} was not found`);
    }
    return this.prisma.dish.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.dish
      .delete({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Dish with id = ${id} was not found`);
      });
  }
}
