import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

const rolesNames: string[] = [
  'ROLE_ADMIN',
  'ROLE_MANAGER',
  'ROLE_USER',
  'ROLE_GUEST',
];

const usersData = [
  {
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivanov@example.com',
    phoneNumber: '+375291234567',
    hash: '12345678',
  },
  {
    firstName: 'Мария',
    lastName: 'Петрова',
    email: 'petrova@example.com',
    phoneNumber: '+375292345678',
    hash: 'password123',
  },
  {
    firstName: 'Алексей',
    lastName: 'Сидоров',
    email: 'sidorov@example.com',
    phoneNumber: '+375293456789',
    hash: 'qwertyui',
  },
  {
    firstName: 'Елена',
    lastName: 'Кузнецова',
    email: 'kuznetsova@example.com',
    phoneNumber: '+375294567890',
    hash: 'securepass',
  },
];

async function main() {
  const rolesData = rolesNames.map((roleName) => ({
    roleName,
  }));
  const hashedUsersData = await Promise.all(
    usersData.map(async (user) => {
      user.hash = await argon2.hash(user.hash);
      return user;
    }),
  );
  await prisma.role.createMany({
    data: rolesData,
  });
  await prisma.user.createMany({
    data: hashedUsersData,
  });

  await prisma.user.update({
    where: { id: 1 },
    data: {
      roles: {
        connect: [{ id: 1 }],
      },
    },
  });

  await prisma.user.update({
    where: { id: 2 },
    data: {
      roles: {
        connect: [{ id: 3 }, { id: 2 }],
      },
    },
  });

  await prisma.user.update({
    where: { id: 3 },
    data: {
      roles: {
        connect: [{ id: 2 }],
      },
    },
  });

  await prisma.user.update({
    where: { id: 4 },
    data: {
      roles: {
        connect: [{ id: 4 }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
