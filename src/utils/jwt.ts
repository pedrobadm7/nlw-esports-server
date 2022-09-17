import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export function generateAccessToken(user: User) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '1d',
    }
  );
}

export function generateRefreshToken(user: User, jti: any) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '1d',
    }
  );
}

export function generateTokens(user: User, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
