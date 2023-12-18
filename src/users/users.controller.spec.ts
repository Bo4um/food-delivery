import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test } from '@nestjs/testing';
import { MockPrismaService } from '../prisma/mock.prisma.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'PrismaService',
          useClass: MockPrismaService,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: 1,
          firstName: 'firstName',
          lastName: 'lastName',
          email: 'email',
          phoneNumber: 'phoneNumber',
          hash: 'hash',
        },
      ];
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => result);
      expect(await usersController.findAll()).toBe(result);
    });
  });
});
