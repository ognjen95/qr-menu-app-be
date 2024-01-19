import { CreateMenuInput } from './create-menu.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {
  @Field()
  id: string;
}
