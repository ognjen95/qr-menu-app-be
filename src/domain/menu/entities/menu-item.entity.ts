import { ObjectType, Field } from '@nestjs/graphql';
import { MenuEntity } from './menu.entity';

@ObjectType()
export class MenuItemVariant {
  @Field()
  name: string;

  @Field()
  price: number;
}

@ObjectType()
export class MenuItemEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => MenuEntity, { nullable: true })
  menu: MenuEntity;

  @Field()
  sectionId: string;

  @Field(() => [MenuItemVariant])
  variants: MenuItemVariant[];

  @Field(() => [String])
  alergens: string[];

  @Field(() => [String])
  tags: string[];

  @Field({ nullable: true })
  image?: string;

  @Field()
  isAvailable: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
