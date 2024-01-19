import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';
import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import { UserRoles } from '../enums';
import { registerEnumType } from '@nestjs/graphql/dist/type-factories/register-enum-type.factory';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  externalId: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => UserRoles)
  userRole: UserRoles;

  @Field({ nullable: true })
  tenantId?: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  nationality: string;

  @Field({ nullable: true })
  phone: string;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
