import { PaginationResponseDto } from 'common/dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'modules/user/user.entity';

@ObjectType()
export class UsersPaginationResponseDto extends PaginationResponseDto<UserEntity> {
  @Field(() => [UserEntity])
  results: UserEntity[];
}
