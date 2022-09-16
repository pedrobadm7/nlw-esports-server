import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';

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
}

export { AdsService };
