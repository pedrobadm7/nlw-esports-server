import { Request, Response } from 'express';
import { DiscordService } from '../services/DiscordService';

const service = new DiscordService();

class DiscordController {
  async show(request: Request, response: Response) {
    const adId = request.params.id;

    const adDiscord = await service.findById(adId);

    return response.json({
      discord: adDiscord,
    });
  }
}

export { DiscordController };
