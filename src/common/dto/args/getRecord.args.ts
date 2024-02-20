import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';

@ArgsType()
export class GetRecordArgs {
  @Field()
  @IsNumberString()
  id: string;
}
