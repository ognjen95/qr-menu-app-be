import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int } from '@nestjs/graphql';
import { PageInfo } from '@domain/common/page-info.entity';
import { MenuEntity } from './menu.entity';
import { Menu } from '../menu';

@ObjectType()
class MenuEdges implements RelayEdge<MenuEntity> {
  @Field(() => MenuEntity, { nullable: false })
  node: Menu;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class MenuConnection implements RelayConnection<MenuEntity> {
  @Field(() => [MenuEdges], { nullable: false })
  edges: Array<RelayEdge<Menu>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
