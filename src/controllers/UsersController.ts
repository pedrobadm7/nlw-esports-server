import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

const service = new UsersService();

class UsersController {
  async index(request: any, response: Response) {
    const { userId } = request.payload;
    const user: any = await service.findUserById(userId);
    delete user.password;
    return response.json(user);
  }
}

export { UsersController };
