import { InputType, Field } from '@nestjs/graphql';
import { CreateUserInput } from '../../user/dtos/create-user.input';

@InputType()
export class CreateCustomerTentantInput extends CreateUserInput {
  @Field()
  name: string;
}
