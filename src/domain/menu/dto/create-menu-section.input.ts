import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMenuSectionInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  menuId: string;

  @Field(() => Int)
  positionIndex: number;

  @Field(() => [String], { defaultValue: [] })
  menuSectionsIds: string[] = [];
}
