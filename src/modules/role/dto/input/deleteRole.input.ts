import { InputType, Field } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';

@InputType()
export class DeleteRoleInput {
  @Field()
  @IsNumberString()
  id: string;
}
