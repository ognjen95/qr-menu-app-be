import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RestaurantIdInput {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class RestaurantWhere {
  @Field({ nullable: true })
  tenantId?: string;

  @Field(() => RestaurantIdInput, { nullable: true })
  id?: RestaurantIdInput;
}

@InputType()
export class RestaurantOptionsInput {
  @Field({ nullable: true })
  where?: RestaurantWhere;
}
