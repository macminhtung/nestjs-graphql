import { PaginationResponseDto } from 'common/dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { RoleEntity } from 'modules/role/role.entity';

@ObjectType()
export class RolesPaginationResponseDto extends PaginationResponseDto<RoleEntity> {
  @Field(() => [RoleEntity])
  readonly results: RoleEntity[];
}
