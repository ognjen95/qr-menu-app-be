import { CreateUserInput } from './create-user.input';
import {
  InputType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { UserRoles } from '../enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => UserRoles, { nullable: true })
  userRole: UserRoles;
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
