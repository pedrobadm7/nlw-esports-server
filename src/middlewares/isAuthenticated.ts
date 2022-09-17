import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(401).json({ error: 'Não autorizado.' });
  }

  try {
    const token = authorization?.split(' ')[1];
    const payload = jwt.verify(
      token ?? '',
      process.env.JWT_ACCESS_SECRET as string
    );
    request.payload = payload;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    return response.status(401).json({ error: 'Não autorizado' });
  }

  return next();
}
