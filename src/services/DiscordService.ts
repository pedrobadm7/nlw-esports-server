import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

class DiscordService {
  async findById(adId: string) {
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    return ad.discord;
  }
}

export { DiscordService };
