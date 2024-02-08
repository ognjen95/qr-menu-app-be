import { CreateThemeConfigurationInput } from '../../../../domain/theme/theme-config/dto/create-theme-configuration.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class CreateThemeCommand {
  constructor(
    public readonly dto: CreateThemeConfigurationInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
