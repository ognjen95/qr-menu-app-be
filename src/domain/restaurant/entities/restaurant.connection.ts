import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int } from '@nestjs/graphql';
import { PageInfo } from '@domain/common/page-info.entity';
import { RestaurantEntity } from './restaurant.entity';
import { Restaurant } from '../restaurant';

@ObjectType()
class RestaurantEdges implements RelayEdge<RestaurantEntity> {
  @Field(() => RestaurantEntity, { nullable: false })
  node: Restaurant;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class RestaurantConnection implements RelayConnection<RestaurantEntity> {
  @Field(() => [RestaurantEdges], { nullable: false })
  edges: Array<RelayEdge<Restaurant>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
