import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  IsDateString,
  Max,
  Min,
  IsBoolean,
} from 'class-validator';
import { OrderEnum } from 'common/enums';

export const NUM_LIMIT_RECORDS = 100000;
export const DEFAULT_PAGE_NUM = 1;
export const DEFAULT_PAGE_TAKE = 30;

@ArgsType()
export class GetRecordsPaginationArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(DEFAULT_PAGE_NUM)
  page: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  keySearch: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  ids: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  createdFrom: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  createdTo: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isSelectAll: boolean;
}
