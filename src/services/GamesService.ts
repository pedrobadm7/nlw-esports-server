import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

class GamesService {
  async findAll() {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return games;
  }
}

export { GamesService };
