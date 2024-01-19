import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int } from '@nestjs/graphql';
import { PageInfo } from '@domain/common/page-info.entity';
import { MenuSectionEntity } from './menu-section.entity';
import { MenuSection } from '../menu-section';

@ObjectType()
class MenuSectionEdges implements RelayEdge<MenuSectionEntity> {
  @Field(() => MenuSectionEntity, { nullable: false })
  node: MenuSection;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class MenuSectionConnection
  implements RelayConnection<MenuSectionEntity>
{
  @Field(() => [MenuSectionEdges], { nullable: false })
  edges: Array<RelayEdge<MenuSection>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
