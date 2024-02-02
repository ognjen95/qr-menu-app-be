import { InputType, Field } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class MenuItemVariantInput {
  @Field()
  name: string;

  @IsPositive()
  @Field()
  price: number;
}

@InputType()
export class CreateMenuItemInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  menuSectionId: string;

  @Field()
  menuId: string;

  @Field(() => [MenuItemVariantInput])
  variants: MenuItemVariantInput[];

  @Field(() => [String], { nullable: true })
  menuItemsIds: string[];

  @Field(() => [String], { nullable: true })
  alergens: string[];

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  isAvailable?: boolean;
}
