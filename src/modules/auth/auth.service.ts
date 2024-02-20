import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';
import { PROVIDER_TOKENS } from 'common/constants';

@Injectable()
export class AuthService {
  @Inject(PROVIDER_TOKENS.USER_SERVICE)
  public readonly userService: UserService;
}
