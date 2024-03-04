import { UpdateThemeConfigurationInput } from '../../../../domain/theme/theme-config/dto/update-theme-configuration.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class SaveThemeCommand {
  constructor(
    public readonly dto: UpdateThemeConfigurationInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
