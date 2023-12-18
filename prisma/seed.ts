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

const restaurantsData = [
  {
    name: 'Ресторан 1',
    address: 'Адрес 1',
    phoneNumber: '+7 (123) 456-7890',
    rating: 4.5,
  },
  {
    name: 'Ресторан 2',
    address: 'Адрес 2',
    phoneNumber: '+7 (234) 567-8901',
    rating: 4.2,
  },
  {
    name: 'Ресторан 3',
    address: 'Адрес 3',
    phoneNumber: '+7 (345) 678-9012',
    rating: 3.8,
  },
  {
    name: 'Ресторан 4',
    address: 'Адрес 4',
    phoneNumber: '+7 (456) 789-0123',
    rating: 4.0,
  },
];

const dishesData = [
  {
    name: 'Золотистый Лосось с Медовым Глазурью',
    description:
      'Нежный кусочек лосося, запечённый с медовой глазурью, подается с ароматным картофельным пюре и свежими овощами.',
    price: 19.99,
    restaurantId: 1,
  },
  {
    name: "Волшебный Салат 'Оазис Здоровья'",
    description:
      'Салат с свежими овощами, авокадо, грецкими орехами и заправленный нежным медово-горчичным соусом.',
    price: 12.99,
    restaurantId: 1,
  },
  {
    name: "Экзотический Ролл 'Футо-Маки Хаос'",
    description:
      'Комбинированный ролл с креветкой, авокадо, огурцом и омлетом, обваляемый в черном рисе и посыпанный орехами.',
    price: 15.99,
    restaurantId: 1,
  },
  {
    name: 'Медальоны с Трюфельным Соусом',
    description:
      'Нежные медальоны из говядины, подается с изысканным соусом на основе трюфелей.',
    price: 18.99,
    restaurantId: 1,
  },
  {
    name: 'Ризотто с Грибами и Шпинатом',
    description:
      'Кремовое ризотто с ароматными грибами и свежим шпинатом, посыпанное пармезаном.',
    price: 16.99,
    restaurantId: 1,
  },
  {
    name: 'Семга с Лимонным Соусом',
    description:
      'Семга, запеченная с лимонным соусом, подается с овощным гарниром и картофельным пюре.',
    price: 22.99,
    restaurantId: 1,
  },
  {
    name: 'Карри с Креветками и Кокосовым Молоком',
    description:
      'Ароматное карри с сочными креветками, приготовленное на кокосовом молоке и подается с ароматным рисом.',
    price: 17.99,
    restaurantId: 2,
  },
  {
    name: 'Стейк с Грибным Соусом',
    description:
      'Говяжий стейк, приготовленный по вашему выбору прожарки, подается с густым грибным соусом.',
    price: 20.99,
    restaurantId: 2,
  },
  {
    name: "Салат 'Весенний Грот'",
    description:
      'Салат с миксом свежих листьев, авокадо, помидорами, грецкими орехами и оливковым маслом.',
    price: 12.99,
    restaurantId: 2,
  },
  {
    name: 'Лапша с Курицей и Терияки',
    description:
      'Азиатская лапша с кусочками курицы, приготовленной в терияки соусе с овощами.',
    price: 14.99,
    restaurantId: 3,
  },
  {
    name: 'Суп-пюре из Брокколи',
    description:
      'Густой суп-пюре из свежего брокколи, подается с хрустящими гренками.',
    price: 8.99,
    restaurantId: 3,
  },
  {
    name: 'Рыбный Тартар с Авокадо',
    description:
      'Треска и лосось, маринованные в лимонном соке, смешаны с нарезанным авокадо и свежими травами.',
    price: 16.99,
    restaurantId: 3,
  },
  {
    name: "Стейк 'Мраморная Нежность'",
    description:
      'Сочный стейк из мраморной говядины, приготовленный на гриле, подается с картофельными дольками.',
    price: 25.99,
    restaurantId: 4,
  },
  {
    name: 'Шоколадный Фондан',
    description:
      'Тающий шоколадный десерт с нежным сердцем, подается с клубничным соусом.',
    price: 9.99,
    restaurantId: 4,
  },
  {
    name: "Салат 'Капрезе'",
    description:
      'Традиционный итальянский салат с помидорами, моцареллой и свежим базиликом, заправленный оливковым маслом.',
    price: 11.99,
    restaurantId: 4,
  },
];

const ordersData = [
  {
    dateTime: '2023-10-24T12:30:00Z',
    status: 'Завершен',
    totalPrice: 45.99,
    restaurantId: 1,
    userId: 1,
  },
  {
    dateTime: '2023-10-25T18:15:00Z',
    status: 'В ожидании',
    totalPrice: 32.5,
    restaurantId: 2,
    userId: 2,
  },
  {
    dateTime: '2023-10-25T20:00:00Z',
    status: 'В ожидании',
    totalPrice: 27.9,
    restaurantId: 3,
    userId: 3,
  },
  {
    dateTime: '2023-10-26T19:00:00Z',
    status: 'В ожидании',
    totalPrice: 39.75,
    restaurantId: 4,
    userId: 4,
  },
  {
    dateTime: '2023-10-27T21:30:00Z',
    status: 'В ожидании',
    totalPrice: 51.2,
    restaurantId: 1,
    userId: 1,
  },
  {
    dateTime: '2023-10-28T17:45:00Z',
    status: 'Отменен',
    totalPrice: 29.99,
    restaurantId: 2,
    userId: 2,
  },
  {
    dateTime: '2023-10-29T14:00:00Z',
    status: 'В ожидании',
    totalPrice: 37.6,
    restaurantId: 3,
    userId: 3,
  },
  {
    dateTime: '2023-10-30T13:20:00Z',
    status: 'В ожидании',
    totalPrice: 42.8,
    restaurantId: 4,
    userId: 4,
  },
  {
    dateTime: '2023-11-01T19:30:00Z',
    status: 'В ожидании',
    totalPrice: 33.9,
    restaurantId: 1,
    userId: 1,
  },
  {
    dateTime: '2023-11-02T22:00:00Z',
    status: 'Завершен',
    totalPrice: 59.75,
    restaurantId: 2,
    userId: 2,
  },
];

const orderItemsData = [
  {
    quantity: 2,
    price: 10.99,
    orderId: 1,
    dishId: 1,
  },
  {
    quantity: 3,
    price: 12.99,
    orderId: 1,
    dishId: 2,
  },
  {
    quantity: 1,
    price: 8.99,
    orderId: 2,
    dishId: 3,
  },
  {
    quantity: 2,
    price: 14.99,
    orderId: 2,
    dishId: 4,
  },
  {
    quantity: 3,
    price: 9.99,
    orderId: 3,
    dishId: 5,
  },
  {
    quantity: 1,
    price: 11.99,
    orderId: 3,
    dishId: 6,
  },
  {
    quantity: 2,
    price: 13.99,
    orderId: 4,
    dishId: 7,
  },
  {
    quantity: 3,
    price: 15.99,
    orderId: 4,
    dishId: 8,
  },
  {
    quantity: 2,
    price: 19.99,
    orderId: 5,
    dishId: 9,
  },
  {
    quantity: 1,
    price: 18.99,
    orderId: 5,
    dishId: 10,
  },
  {
    quantity: 3,
    price: 22.99,
    orderId: 6,
    dishId: 11,
  },
  {
    quantity: 2,
    price: 17.99,
    orderId: 6,
    dishId: 12,
  },
  {
    quantity: 1,
    price: 16.99,
    orderId: 7,
    dishId: 13,
  },
  {
    quantity: 2,
    price: 20.99,
    orderId: 7,
    dishId: 14,
  },
  {
    quantity: 3,
    price: 24.99,
    orderId: 8,
    dishId: 15,
  },
];

const deliveriesData = [
  {
    method: 'Курьерская доставка',
    price: 5.0,
    address: 'ул. Пушкина, д.10, кв. 5',
    recipientName: 'Иван Иванов',
    recipientPhoneNumber: '+375291234567',
    orderId: 1,
  },
  {
    method: 'Самовывоз',
    price: 0.0,
    address: '',
    recipientName: '',
    recipientPhoneNumber: '',
    orderId: 2,
  },
  {
    method: 'Курьерская доставка',
    price: 4.0,
    address: 'ул. Ленина, д.15, кв. 8',
    recipientName: 'Мария Петрова',
    recipientPhoneNumber: '+375292345678',
    orderId: 3,
  },
  {
    method: 'Самовывоз',
    price: 0.0,
    address: '',
    recipientName: '',
    recipientPhoneNumber: '',
    orderId: 4,
  },
  {
    method: 'Курьерская доставка',
    price: 3.5,
    address: 'ул. Советская, д.20, кв. 12',
    recipientName: 'Алексей Сидоров',
    recipientPhoneNumber: '+375293456789',
    orderId: 5,
  },
  {
    method: 'Самовывоз',
    price: 0.0,
    address: '',
    recipientName: '',
    recipientPhoneNumber: '',
    orderId: 6,
  },
  {
    method: 'Курьерская доставка',
    price: 6.0,
    address: 'ул. Гагарина, д.25, кв. 3',
    recipientName: 'Елена Кузнецова',
    recipientPhoneNumber: '+375294567890',
    orderId: 7,
  },
  {
    method: 'Самовывоз',
    price: 0.0,
    address: '',
    recipientName: '',
    recipientPhoneNumber: '',
    orderId: 8,
  },
  {
    method: 'Курьерская доставка',
    price: 5.5,
    address: 'ул. Мира, д.30, кв. 7',
    recipientName: 'Иван Иванов',
    recipientPhoneNumber: '+375291234567',
    orderId: 9,
  },
  {
    method: 'Самовывоз',
    price: 0.0,
    address: '',
    recipientName: '',
    recipientPhoneNumber: '',
    orderId: 10,
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
    where: { id: 3 }, },
});

await prisma.user.update({
  where: { id: 4 },
  data: {
    roles: {
      connect: [{ id: 4 }],
    },
  },
    data: {
      roles: {
        connect: [{ id: 2 }],
      },

  });
  await prisma.restaurant.createMany({
    data: restaurantsData,
  });
  await prisma.dish.createMany({
    data: dishesData,
  });
  await prisma.order.createMany({ data: ordersData });
  await prisma.orderItem.createMany({ data: orderItemsData });
  await prisma.delivery.createMany({ data: deliveriesData });
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
