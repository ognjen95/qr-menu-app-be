import { ObjectType, Field } from '@nestjs/graphql';
import { LocationEntity } from './location.entity';

@ObjectType()
export class RestaurantEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocationEntity, { nullable: true })
  location?: LocationEntity;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  image?: string;

  @Field()
  tenantId: string;

  @Field({ nullable: true })
  menuId: string;

  // @Field(() => Int)
  // ratings: Rating;

  // @Field(() => Int)
  // menus: Menu;
}
