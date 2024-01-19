import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int } from '@nestjs/graphql';
import { PageInfo } from '@domain/common/page-info.entity';
import { MenuItemEntity } from './menu-item.entity';
import { MenuItem } from '../menu-item';

@ObjectType()
class MenuItemsEdges implements RelayEdge<MenuItemEntity> {
  @Field(() => MenuItemEntity, { nullable: false })
  node: MenuItem;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class MenuItemsConnection implements RelayConnection<MenuItemEntity> {
  @Field(() => [MenuItemsEdges], { nullable: false })
  edges: Array<RelayEdge<MenuItem>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
