import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  state?: string;
}

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocationInput, { nullable: true })
  location?: LocationInput;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  menuId: string;
}
