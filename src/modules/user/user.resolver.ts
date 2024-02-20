import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserEntity } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import {
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
} from 'modules/user/dto';
import { GetRecordArgs, GetRecordsPaginationArgs } from 'common/dto';
import { Authorization, UnAuthenticated } from 'decorators';
import { DEFAULT_SCOPES, PROVIDER_TOKENS } from 'common/constants';
import { UsersPaginationResponseDto } from './dto/usersPaginationResponse.dto';

const { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER } = DEFAULT_SCOPES;

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    @Inject(PROVIDER_TOKENS.USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  // #==================#
  // # ==> GET USER <== #
  // #==================#
  @Query(() => UserEntity)
  @Authorization([GET_USER.name])
  async getUser(@Args() args: GetRecordArgs) {
    return await this.userService.getUser(args);
  }

  // #================================#
  // # ==> GET USERS [PAGINATION] <== #
  // #================================#
  @UnAuthenticated()
  @Query(() => UsersPaginationResponseDto)
  @Authorization([GET_USER.name])
  async getUsersPagination(@Args() args: GetRecordsPaginationArgs) {
    return await this.userService.getUsersPagination(args);
  }

  // #=====================#
  // # ==> CREATE USER <== #
  // #=====================#
  @Mutation(() => UserEntity)
  @Authorization([CREATE_USER.name])
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  // #=====================#
  // # ==> UPDATE USER <== #
  // #=====================#
  @Mutation(() => UserEntity)
  @Authorization([UPDATE_USER.name])
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.userService.updateUser(input);
  }

  // #=====================#
  // # ==> DELETE USER <== #
  // #=====================#
  @Mutation(() => UserEntity)
  @Authorization([DELETE_USER.name])
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return await this.userService.deleteUser(input);
  }
}
