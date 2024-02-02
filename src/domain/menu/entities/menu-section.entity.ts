import { ObjectType, Field } from '@nestjs/graphql';
import { MenuItem } from '../menu-item';
import { MenuItemEntity } from './menu-item.entity';

@ObjectType()
export class MenuSectionEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  menuId: string;

  @Field(() => [MenuItemEntity], { nullable: true })
  menuItems: MenuItem[];

  @Field(() => [String], { defaultValue: [] })
  menuItemIds: string[] = [];

  @Field()
  isVisible: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
