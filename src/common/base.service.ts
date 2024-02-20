import {
  Repository,
  FindOptionsWhere,
  FindOneOptions,
  DataSource,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as moment from 'moment';
import { OrderEnum } from './enums';
import {
  NUM_LIMIT_RECORDS,
  DEFAULT_PAGE_NUM,
  DEFAULT_PAGE_TAKE,
  GetRecordsPaginationArgs,
  PaginationResponseDto,
} from 'common/dto';

@Injectable()
export class BaseService<E> {
  constructor(public readonly repository: Repository<E>) {}

  @InjectDataSource()
  readonly dataSource: DataSource;
  readonly entityName = this.repository.metadata.name;
  public pagingQueryBuilder: SelectQueryBuilder<E>;

  // #==============================#
  // # ==> CHECK DEFAULT RECORD <== #
  // #==============================#
  checkDefaultRecord(isDefault: boolean) {
    if (isDefault)
      throw new BadRequestException({
        message: 'Can not change a default record!',
      });
  }

  // #=====================#
  // # ==> TRANSACTION <== #
  // #=====================#
  async handleTransactionAndRelease(
    queryRunner: QueryRunner,
    callback: () => Promise<E>,
  ): Promise<E> {
    try {
      // Start transaction
      await queryRunner.startTransaction();

      // Run callback function
      const entity = await callback();

      // Commit transaction
      await queryRunner.commitTransaction();

      return entity;

      // Rollback
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException({ message: err.message });

      // Release the query runner
    } finally {
      await queryRunner.release();
    }
  }

  // #=====================#
  // # ==> CHECK_EXIST <== #
  // #=====================#
  async checkExist(
    options: FindOneOptions<E> | FindOptionsWhere<E>,
    expectNotFoundMessage?: string,
  ): Promise<E | null> {
    const existRecord =
      'where' in options
        ? await this.repository.findOne(options)
        : await this.repository.findOneBy(options as FindOptionsWhere<E>);

    // CASE: Expect the record not found
    if (expectNotFoundMessage) {
      if (existRecord)
        throw new ConflictException({
          message: expectNotFoundMessage,
        });
      return null;
    }

    // CASE: Expect the record exist
    if (!existRecord)
      throw new NotFoundException({
        message: `[${this.repository.metadata.name}] Not found!`,
      });
    return existRecord;
  }

  // #====================#
  // # ==> PAGINATION <== #
  // #====================#
  async getPaginationByQuery(
    args: GetRecordsPaginationArgs,
    customFilter?: () => void,
  ): Promise<PaginationResponseDto<E>> {
    const {
      isDeleted,
      createdFrom,
      createdTo,
      ids,
      isSelectAll,
      order = OrderEnum.DESC,
      page = DEFAULT_PAGE_NUM,
      take = DEFAULT_PAGE_TAKE,
    } = args;

    // Query records based on list ID
    const queryBuilder = this.repository.createQueryBuilder(this.entityName);
    if (ids?.length) queryBuilder.whereInIds(ids);

    // Query records based on date range
    if (createdFrom || createdTo)
      queryBuilder
        .andWhere(`${this.entityName}.createdAt >= :createdFrom`, {
          createdFrom: createdFrom ? moment(createdFrom) : new Date(1945, 1, 1),
        })
        .andWhere(`${this.entityName}.createdAt < :createdTo`, {
          createdTo: createdTo ? moment(createdTo) : new Date(),
        });

    // Query deleted records
    if (isDeleted)
      queryBuilder
        .andWhere(`${this.entityName}.deletedAt IS NOT NULL`)
        .withDeleted();

    // NOTE: Must mapping queryBuilder into pagingQueryBuilder before run customFilter
    this.pagingQueryBuilder = queryBuilder;

    // Run customFilter function
    customFilter && customFilter();

    // Sort records via createdAt
    this.pagingQueryBuilder.addOrderBy(`${this.entityName}.createdAt`, order);

    // CASE: Select all records
    if (isSelectAll) this.pagingQueryBuilder.limit(NUM_LIMIT_RECORDS);
    // CASE: Select pagination records
    else this.pagingQueryBuilder.take(take).skip((page - 1) * take);

    const [entities, count] = await this.pagingQueryBuilder.getManyAndCount();

    return new PaginationResponseDto<E>({
      args,
      total: count,
      results: entities,
    });
  }
}
