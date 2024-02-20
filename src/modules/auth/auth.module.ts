import { Module } from '@nestjs/common';
import { UserModule } from 'modules/user/user.module';
import { AuthController } from 'modules/auth/auth.controller';
import { AuthService } from 'modules/auth/auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
