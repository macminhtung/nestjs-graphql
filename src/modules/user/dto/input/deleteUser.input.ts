import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field()
  @IsString()
  id: string;
}
