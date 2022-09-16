import { Request, Response } from 'express';
import { AdsService } from '../services/AdsService';

const service = new AdsService();

class AdsController {
  async show(request: Request, response: Response) {
    const gameId = request.params.id;

    const ads = await service.findById(gameId);

    return response.json(ads);
  }

  async store(request: Request, response: Response) {
    const gameId = request.params.id;
    const body: any = request.body;

    const ad = await service.create(gameId, body);

    return response.status(201).json(ad);
  }
}

export { AdsController };
