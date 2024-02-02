import { CreateMenuSectionInput } from './create-menu-section.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuSectionInput extends PartialType(
  CreateMenuSectionInput,
) {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true })
  positionIndex: number;

  @Field(() => [String], { nullable: true })
  menuItemIds: string[];
}
