import { prisma } from '../utils/db';
import { hashToken } from '../utils/hash-token';

interface RefreshTokenProps {
  jti: string;
  refreshToken: string;
  userId: string;
}

class AuthService {
  async addRefreshTokenToWhitelist({
    jti,
    refreshToken,
    userId,
  }: RefreshTokenProps) {
    return await prisma.refreshToken.create({
      data: {
        id: jti,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  }

  async findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteRefreshToken(id: string) {
    return prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  }

  async revokeTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  }
}

export { AuthService };
