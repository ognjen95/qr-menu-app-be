import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MenuItemIdInput {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class MenuItemWhere {
  @Field({ nullable: true })
  sectionId?: string;

  @Field(() => MenuItemIdInput, { nullable: true })
  id?: MenuItemIdInput;
}

@InputType()
export class MenuItemOptionsInput {
  @Field({ nullable: true })
  where?: MenuItemWhere;
}
