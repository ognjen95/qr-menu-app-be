import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMenuSectionInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  menuId: string;
}
