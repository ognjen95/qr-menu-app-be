import { ObjectType, Field } from '@nestjs/graphql';
import { Restaurant } from '../../restaurant/restaurant';
import { RestaurantEntity } from '../../restaurant/entities/restaurant.entity';
import { MenuSection } from '../menu-section';
import { MenuSectionEntity } from './menu-section.entity';

@ObjectType()
export class MenuEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [RestaurantEntity], { nullable: true })
  restaurants: Restaurant[];

  @Field(() => [MenuSectionEntity])
  menuSections: MenuSection[];

  @Field()
  tenantId: string;

  @Field()
  isVisible: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
