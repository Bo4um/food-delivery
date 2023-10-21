import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const userInDb = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userInDb) {
      throw new ForbiddenException('This email is already in use');
    }
    const hash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        hash,
      },
    });
    delete user.hash;
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.map((user) => delete user.hash);
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    delete user.hash;
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: true,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
    return updatedUser;
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
