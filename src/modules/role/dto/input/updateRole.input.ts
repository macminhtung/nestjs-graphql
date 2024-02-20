import { InputType, Field } from '@nestjs/graphql';
import {
  IsNumberString,
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

@InputType()
export class UpdateRoleInput {
  @Field()
  @IsNumberString()
  id: string;

  @Field()
  @IsString()
  name: string;

  @Field(() => Number)
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  scopeIds: number[];
}
