import { Injectable } from '@nestjs/common';
import { UserEntity } from 'modules/user/user.entity';
import { BaseService } from 'common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
  UsersPaginationResponseDto,
} from 'modules/user/dto';

import { GetRecordArgs, GetRecordsPaginationArgs } from 'common/dto';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  // #=====================#
  // # ==> CREATE USER <== #
  // #=====================#
  async createUser(input: CreateUserInput): Promise<UserEntity> {
    return await this.repository.save(input);
  }

  // #=====================#
  // # ==> UPDATE USER <== #
  // #=====================#
  async updateUser(input: UpdateUserInput): Promise<UserEntity> {
    await this.checkExist({ id: input.id });
    return await this.repository.save(input);
  }

  // #=====================#
  // # ==> DELETE USER <== #
  // #=====================#
  async deleteUser(input: DeleteUserInput): Promise<any> {
    return await this.repository.softDelete(input.id);
  }

  // #==================#
  // # ==> GET USER <== #
  // #==================#
  async getUser(args: GetRecordArgs): Promise<UserEntity> {
    return await this.checkExist({
      where: { id: args.id },
      relations: { roles: true },
    });
  }

  // #================================#
  // # ==> GET USERS [PAGINATION] <== #
  // #================================#
  async getUsersPagination(
    args: GetRecordsPaginationArgs,
  ): Promise<UsersPaginationResponseDto> {
    const pagination = await this.getPaginationByQuery(args, () => {
      this.pagingQueryBuilder
        .leftJoinAndSelect(`${this.entityName}.roles`, 'Rs')
        .leftJoinAndSelect(`Rs.scopes`, 'SCs');

      // Query records based on keySearch
      const { keySearch } = args;
      if (keySearch)
        this.pagingQueryBuilder.andWhere(
          `(${this.entityName}.email ILIKE :keySearch 
            OR ${this.entityName}.displayName ILIKE :keySearch 
            OR ${this.entityName}.firstName ILIKE :keySearch)`,
          {
            keySearch: `%${keySearch}%`,
          },
        );
    });

    return pagination;
  }
}
