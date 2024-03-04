import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveThemeCommand } from './save-theme.command';
import { IThemeRepository } from '../../../common/interfaces/theme/theme-repository.interface';
import { ThemeConfig } from '../../../../domain/theme/theme-config';
import { Inject } from '@nestjs/common';
import { THEME_CONFIG_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(SaveThemeCommand)
class SaveThemeHandler implements ICommandHandler<SaveThemeCommand> {
  constructor(
    @Inject(THEME_CONFIG_REPOSITORY_TOKEN)
    private readonly themeRepository: IThemeRepository,
  ) { }

  async execute({ dto, currentUser }: SaveThemeCommand): Promise<any> {
    const newTheme = new ThemeConfig();

    const dtoWithTenantId = { ...dto, tenantId: currentUser.tenantId };
    const existingTheme = await this.themeRepository.findByTenantId(currentUser.tenantId);

    if (existingTheme) {
      dtoWithTenantId.id = existingTheme.id;
    } else {
      dtoWithTenantId.id = undefined;
    }

    newTheme.generateThemeConfig(dtoWithTenantId);

    const createdTheme = await this.themeRepository.createOrUpdate(newTheme);

    return createdTheme.id;
  }
}

export default SaveThemeHandler;
