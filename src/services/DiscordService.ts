import { prisma } from '../utils/db';

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
