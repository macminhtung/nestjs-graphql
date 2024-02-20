import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RoleEntity } from 'modules/role/role.entity';
import { RoleService } from 'modules/role/role.service';
import { DEFAULT_SCOPES } from 'common/constants';
import { Authorization } from 'decorators';
import {
  CreateRoleInput,
  UpdateRoleInput,
  DeleteRoleInput,
  RolesPaginationResponseDto,
} from 'modules/role/dto';
import { GetRecordArgs, GetRecordsPaginationArgs } from 'common/dto';

const { CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE, GET_ROLE } = DEFAULT_SCOPES;

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  // #=====================#
  // # ==> CREATE ROLE <== #
  // #=====================#
  @Authorization([CREATE_ROLE.name])
  @Mutation(() => RoleEntity)
  createRole(@Args('input') input: CreateRoleInput) {
    return this.roleService.createRole(input);
  }

  // #=====================#
  // # ==> UPDATE ROLE <== #
  // #=====================#
  @Authorization([UPDATE_ROLE.name])
  updateRole(@Args('input') input: UpdateRoleInput) {
    return this.roleService.updateRole(input);
  }

  // #=====================#
  // # ==> DELETE ROLE <== #
  // #=====================#
  @Authorization([DELETE_ROLE.name])
  deleteRole(@Args('input') input: DeleteRoleInput) {
    return this.roleService.deleteRole(input.id);
  }

  // #======================#
  // # ==> RESTORE ROLE <== #
  // #======================#
  @Authorization([CREATE_ROLE.name])
  restoreRole(@Args('input') input: DeleteRoleInput) {
    return this.roleService.restoreRole(input.id);
  }

  // #================================#
  // # ==> GET ROLES [PAGINATION] <== #
  // #================================#
  @Query(() => [RoleEntity])
  @Authorization([GET_ROLE.name])
  getRole(@Args() args: GetRecordArgs) {
    return this.roleService.getRole(args);
  }

  // #================================#
  // # ==> GET ROLES [PAGINATION] <== #
  // #================================#
  @Query(() => RolesPaginationResponseDto)
  @Authorization([GET_ROLE.name])
  getRolesPagination(@Args() args: GetRecordsPaginationArgs) {
    return this.roleService.getRolesPagination(args);
  }
}
