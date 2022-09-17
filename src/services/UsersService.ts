import { prisma } from '../utils/db';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

class UsersService {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUserByEmailAndPassword(user: User) {
    console.log('Chegou aqui');
    user.password = bcrypt.hashSync(user.password, 12);
    return await prisma.user.create({
      data: user,
    });
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}

export { UsersService };
