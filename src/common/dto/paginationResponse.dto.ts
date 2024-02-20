import {
  GetRecordsPaginationArgs,
  DEFAULT_PAGE_NUM,
  DEFAULT_PAGE_TAKE,
} from 'common/dto';
import { Field, ObjectType } from '@nestjs/graphql';

interface IPageMetaDtoParameters<E> {
  args: GetRecordsPaginationArgs;
  total: number;
  results: E[];
}

@ObjectType()
export class PaginationResponseDto<E> {
  constructor(payload: IPageMetaDtoParameters<E>) {
    const { args, total, results } = payload;
    const { page, take, isSelectAll } = args;
    this.page = page | DEFAULT_PAGE_NUM;
    this.take = take | DEFAULT_PAGE_TAKE;
    this.total = total;
    this.pageCount = isSelectAll ? 1 : Math.ceil(total / take) || 1;
    this.hasPreviousPage = page > 1;
    this.hasNextPage = page < this.pageCount;
    this.results = results;
  }

  @Field()
  page: number;

  @Field()
  take: number;

  @Field()
  total: number;

  @Field()
  pageCount: number;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;

  results: E[];
}
