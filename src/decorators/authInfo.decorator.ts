import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AUTH_REQUEST_KEY } from 'guards/auth.guard';

export interface IAuthInfo {
  authId: string;
  email: string;
  roleNames: string[];
  scopeNames: string[];
}

export const AuthInfo = createParamDecorator(
  (_: unknown, context: ExecutionContext): IAuthInfo => {
    const request = context.switchToHttp().getRequest();
    return request[AUTH_REQUEST_KEY];
  },
);
