import { Controller } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
