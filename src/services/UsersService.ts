import { prisma } from '../utils/db';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

class UsersService {
  async findAllUsers() {
    return await prisma.user.findMany();
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
      where: {
        email,
      },
    });
  }

  async createUserByEmailAndPassword(user: User) {
    user.password = bcrypt.hashSync(user.password, 12);
    return await prisma.user.create({
      data: user,
    });
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
      where: {
        id,
      },
    });
  }
}

export { UsersService };
