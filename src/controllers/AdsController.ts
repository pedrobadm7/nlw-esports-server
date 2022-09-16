import { Request, Response } from 'express';
import { AdsService } from '../services/AdsService';

class AdsController {
  async store(request: Request, response: Response) {
    const gameId = request.params.id;
    const body: any = request.body;

    const service = new AdsService();

    const ad = await service.create(gameId, body);

    return response.status(201).json(ad);
  }
}

export { AdsController };
