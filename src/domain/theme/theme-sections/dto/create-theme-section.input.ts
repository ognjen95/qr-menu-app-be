import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateThemeSectionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
