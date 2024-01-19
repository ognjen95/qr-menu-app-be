import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CustomerTentantEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Date)
  createdAt: Date;
}
