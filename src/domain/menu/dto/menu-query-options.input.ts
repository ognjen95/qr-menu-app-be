import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MenuIdInput {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class MenuWhere {
  @Field({ nullable: true })
  tenantId?: string;

  @Field(() => MenuIdInput, { nullable: true })
  id?: MenuIdInput;
}

@InputType()
export class MenuOptionsInput {
  @Field({ nullable: true })
  where?: MenuWhere;
}
