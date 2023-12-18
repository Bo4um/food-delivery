class MockPrismaService {
  async findUnique() {
    // Вернуть заглушку для метода user_findUnique
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
    };
  }

  async findMany() {
    // Вернуть заглушку для метода user_findMany
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '+0987654321',
      },
    ];
  }

  async findOne() {
    // Вернуть заглушку для метода user_findOne
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
    };
  }

  async user_create(data) {
    // Вернуть заглушку для метода user_create
    return {
      id: 3,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
  }

  async user_update(args) {
    // Вернуть заглушку для метода user_update
    return {
      id: args.where.id,
      firstName: args.data.firstName,
      lastName: args.data.lastName,
      email: args.data.email,
      phoneNumber: args.data.phoneNumber,
    };
  }

  async user_delete(where) {
    // Вернуть заглушку для метода user_delete
    return {
      id: where.id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '',
    };
  }
}

export { MockPrismaService };
