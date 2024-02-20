import { PaginationResponseDto } from 'common/dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { ScopeEntity } from 'modules/role/scope/scope.entity';

@ObjectType()
export class ScopesPaginationResponseDto extends PaginationResponseDto<ScopeEntity> {
  @Field(() => [ScopeEntity])
  readonly results: ScopeEntity[];
}
