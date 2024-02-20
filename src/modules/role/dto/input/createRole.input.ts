import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, ArrayMinSize, IsNumber } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Number)
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  scopeIds: number[];
}
