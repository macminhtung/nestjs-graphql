import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_REQUEST_KEY } from 'guards/auth.guard';
import { IAuthInfo, SCOPE_NAMES_KEY, UNAUTHENTICATED_KEY } from 'decorators';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextFunc = context.getHandler();

    // Check public API
    const isUnAuthenticated = this._reflector.get(
      UNAUTHENTICATED_KEY,
      contextFunc,
    );
    if (isUnAuthenticated) return true;

    // Get auth scopeNames
    const request = context.switchToHttp().getRequest();
    const authInfo = request[AUTH_REQUEST_KEY] as IAuthInfo;
    const { scopeNames } = authInfo;

    // Get context scopeNames
    const contextScopeNames: string[] = this._reflector.get(
      SCOPE_NAMES_KEY,
      contextFunc,
    );

    // Check contextScopeNames is valid
    const isPassed = contextScopeNames.every((contextScopeName) =>
      scopeNames.includes(contextScopeName),
    );

    return isPassed;
  }
}
