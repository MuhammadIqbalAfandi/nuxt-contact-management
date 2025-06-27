import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';

interface AuthenticateRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(
    req: AuthenticateRequest,
    res: any,
    next: (error?: any) => void,
  ): Promise<void> {
    const token = req.headers['authorization'] as string;

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
