import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from '@domain/user/enums';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  tenantId: string;

  @Field(() => UserRoles, { nullable: true })
  userRole?: UserRoles;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  phone?: string;
}
