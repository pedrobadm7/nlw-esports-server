import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

const service = new UsersService();

class UsersController {
  async index(request: any, response: Response) {
    const { userId } = request.payload;
    const user = await service.findUserById(userId);
    return response.json(user);
  }
}

export { UsersController };
