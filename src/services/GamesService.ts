import { prisma } from '../utils/db';
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
