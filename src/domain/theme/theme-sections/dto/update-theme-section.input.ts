import { CreateThemeSectionInput } from './create-theme-section.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateThemeSectionInput extends PartialType(CreateThemeSectionInput) {
  @Field(() => Int)
  id: number;
}
