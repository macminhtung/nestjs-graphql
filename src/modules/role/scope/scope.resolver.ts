import { Resolver, Query, Args } from '@nestjs/graphql';
import { ScopeEntity } from 'modules/role/scope/scope.entity';
import { ScopeService } from 'modules/role/scope/scope.service';
import { DEFAULT_SCOPES } from 'common/constants';
import { Authorization } from 'decorators';
import { GetRecordsPaginationArgs } from 'common/dto';
import { ScopesPaginationResponseDto } from 'modules/role/scope/dto/scopesPaginationResponse.dto';

const { GET_ROLE } = DEFAULT_SCOPES;

@Resolver(() => ScopeEntity)
export class ScopeResolver {
  constructor(private scopeService: ScopeService) {}

  // #================================#
  // # ==> GET SCOPES [PAGINATION] <== #
  // #================================#
  @Authorization([GET_ROLE.name])
  @Query(() => ScopesPaginationResponseDto)
  getScopesPagination(@Args() args: GetRecordsPaginationArgs) {
    return this.scopeService.getScopesPagination(args);
  }
}
