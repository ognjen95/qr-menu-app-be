import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LocationEntity {
  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  state?: string;
}
