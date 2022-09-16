import { Request, Response } from 'express';
import { GamesService } from '../services/GamesService';

class GamesController {
  async index(request: Request, response: Response) {
    const service = new GamesService();
    const games = await service.findAll();

    return response.json(games);
  }
}

export { GamesController };
