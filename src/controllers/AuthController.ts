import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../utils/jwt';
import { AuthService } from '../services/AuthService';
import bcrypt from 'bcrypt';

const usersService = new UsersService();
const authService = new AuthService();

class AuthController {
  async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'Todos os campos devem ser preenchidos.' });
    }

    const existingUser = await usersService.findUserByEmail(email);

    if (existingUser) {
      return response.status(400).json({ error: 'Este email já existe.' });
    }

    const user = await usersService.createUserByEmailAndPassword({
      email,
      password,
    } as User);

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: user.id,
    });

    return response.json({ accessToken, refreshToken });
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'Você deve colocar um email e uma senha.' });
    }

    const existingUser = await usersService.findUserByEmail(email);

    if (!existingUser) {
      return response.status(403).json({ error: 'Credenciais invalidas.' });
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return response.status(403).json({ error: 'Credenciais invalidas' });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await authService.addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    return response.json({ accessToken, refreshToken });
  }
}

export { AuthController };
