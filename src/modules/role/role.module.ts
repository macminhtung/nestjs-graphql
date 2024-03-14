import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { RoleEntity } from 'modules/role/role.entity';
import { RoleService } from 'modules/role/role.service';
import { RoleResolver } from 'modules/role/role.resolver';
import { ScopeEntity } from 'modules/role/scope/scope.entity';
import { ScopeService } from 'modules/role/scope/scope.service';
import { ScopeResolver } from 'modules/role/scope/scope.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, ScopeEntity, UserEntity])],
  providers: [RoleResolver, ScopeResolver, RoleService, ScopeService],
})
export class RoleModule {}
