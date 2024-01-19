import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ApplicantsIdsInput {
  @Field()
  hasSome?: string;
}

@InputType()
export class UserWhereInput {
  @Field(() => ApplicantsIdsInput)
  applicationId?: ApplicantsIdsInput;
}

@InputType()
export class UserQueryOptionsInput {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;
}
