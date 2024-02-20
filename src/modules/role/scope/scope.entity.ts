import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'common/base.entity';
import { EntityEnum } from 'common/enums';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: EntityEnum.SCOPE })
export class ScopeEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ length: 2048, unique: true })
  description: string;
}
