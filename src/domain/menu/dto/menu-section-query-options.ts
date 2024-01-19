import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MenuSectionsIdInput {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class MenuSectionsWhere {
  @Field({ nullable: true })
  menuId?: string;

  @Field(() => MenuSectionsIdInput, { nullable: true })
  id?: MenuSectionsIdInput;
}

@InputType()
export class MenuSectionsOptionsInput {
  @Field({ nullable: true })
  where?: MenuSectionsWhere = {};
}
