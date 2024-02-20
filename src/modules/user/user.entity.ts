import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'common/base.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { EntityEnum } from 'common/enums';
import { RoleEntity } from 'modules/role/role.entity';

@ObjectType()
@Entity({ name: EntityEnum.USER })
export class UserEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field()
  @Column({ default: new Date().getTime().toString() })
  sessionTimestamp: string;

  @Field(() => [RoleEntity], { nullable: true })
  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: EntityEnum.USER_ROLE })
  roles: RoleEntity[];
}
