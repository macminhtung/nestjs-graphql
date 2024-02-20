import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  displayName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName: string;
}
