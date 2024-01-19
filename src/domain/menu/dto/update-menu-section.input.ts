import { CreateMenuSectionInput } from './create-menu-section.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuSectionInput extends PartialType(
  CreateMenuSectionInput,
) {
  @Field(() => Int)
  id: number;
}
