import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';

interface AuthenticateRequest extends Request {
  user?: User;
}

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: AuthenticateRequest = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      return user;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  },
);
