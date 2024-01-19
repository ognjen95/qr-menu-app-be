import { CreateCustomerTentantInput } from './create-customer-tentant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerTentantInput extends PartialType(
  CreateCustomerTentantInput,
) {
  @Field(() => Int)
  id: number;
}
