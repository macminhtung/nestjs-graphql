import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field()
  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({
    type: 'timestamp without time zone',
    nullable: true,
  })
  deletedAt: Date;
}
