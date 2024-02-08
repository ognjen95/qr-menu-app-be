import { CreateThemeConfigurationInput } from './create-theme-configuration.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateThemeConfigurationInput extends PartialType(
  CreateThemeConfigurationInput,
) {
  @Field()
  id: string;
}
