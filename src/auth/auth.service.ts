import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/dto.signin';
import * as argon2 from 'argon2';
import { SignUpDto } from './dto/dto.signup';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {}

  async signin(dto: SignInDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Bad credentials');
    }
    const passwordsMatch = await argon2.verify(user.hash, dto.password);
    if (!passwordsMatch) {
      throw new ForbiddenException('Bad credentials');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };

    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }

  async signup(dto: SignUpDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user) {
      throw new ForbiddenException('This email is already in use');
    }
    const hash = await argon2.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    await this.prisma.user.update({
      where: { id: newUser.id },
      data: {
        roles: {
          connect: [{ id: 3 }],
        },
      },
    });
    const payload = {
      sub: newUser.id,
      email: newUser.email,
      roles: [
        {
          id: 1,
          roleName: 'ROLE_ADMIN',
        },
      ],
    };

    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }
}
