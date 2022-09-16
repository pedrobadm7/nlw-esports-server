import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string';

const prisma = new PrismaClient({
  log: ['query'],
});

class AdsService {
  async create(gameId: string, body: any) {
    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    });

    return ad;
  }

  async findById(gameId: string) {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    });
  }
}

export { AdsService };
