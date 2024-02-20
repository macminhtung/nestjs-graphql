import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { UserService } from 'modules/user/user.service';
import { UNAUTHENTICATED_KEY, IAuthInfo } from 'decorators';
import { MAIN_ENV } from 'env';
import { Request } from 'express';
import { RoleEntity } from 'modules/role/role.entity';

export const AUTH_REQUEST_KEY = 'auth';
export interface IRoleScopeInfo {
  roleNames: string[];
  scopeNames: string[];
}
export const getRoleScopeInfo = (roles: RoleEntity[]): IRoleScopeInfo =>
  roles.reduce(
    (prevV: { roleNames: string[]; scopeNames: string[] }, role) => {
      const { name, scopes } = role;
      prevV.roleNames.push(name);
      scopes.forEach((scope) => {
        if (!prevV.scopeNames.includes(scope.name))
          prevV.scopeNames.push(scope.name);
      });
      return prevV;
    },
    { roleNames: [], scopeNames: [] },
  );

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // #====================================#
    // # ==> CASE: UNAUTHENTICATED APIs <== #
    // #====================================#
    const isUnAuthenticated = this.reflector.get<boolean>(
      UNAUTHENTICATED_KEY,
      context.getHandler(),
    );
    if (isUnAuthenticated) return true;

    const request = context.switchToHttp().getRequest() as Request;
    const token = request?.headers?.authorization?.replace('Bearer ', '');
    let tokenPayload: JwtPayload;

    // #==================================#
    // # ==> CASE: AUTHENTICATED APIs <== #
    // #==================================#
    jwt.verify(
      token,
      MAIN_ENV.APP.JWT_SECRET_KEY,
      (err: VerifyErrors, decodedToken: JwtPayload) => {
        if (err)
          // If the response error message is "jwt expired"
          // ==> The client-side has to refresh an accessToken
          throw new UnauthorizedException({
            message: err.message,
          });
        tokenPayload = decodedToken;
      },
    );

    // Check user already exists!
    const user = await this.userService.checkExist({
      where: { id: tokenPayload.id },
      // relations: { roles: { scopes: true } },
    });

    // Check sessionTimestamp
    if (tokenPayload.sessionTimestamp !== user.sessionTimestamp)
      throw new UnauthorizedException({
        message: 'SessionTimestamp invalid!',
      });

    // Add AUTH_REQUEST_KEY into the request
    const { id: authId, email, roles } = user;
    const roleScopeInfo = getRoleScopeInfo(roles);
    const authInfo: IAuthInfo = {
      authId,
      email,
      ...roleScopeInfo,
    };
    request[AUTH_REQUEST_KEY] = authInfo;

    return true;
  }
}
