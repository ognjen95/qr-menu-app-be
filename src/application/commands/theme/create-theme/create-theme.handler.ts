import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateThemeCommand } from './create-theme.command';
import { IThemeRepository } from '../../../common/interfaces/theme/theme-repository.interface';
import { ThemeConfig } from '../../../../domain/theme/theme-config';
import { Inject } from '@nestjs/common';
import { THEME_CONFIG_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@CommandHandler(CreateThemeCommand)
class CreateThemeHandler implements ICommandHandler<CreateThemeCommand> {
  constructor(
    @Inject(THEME_CONFIG_REPOSITORY_TOKEN)
    private readonly themeRepository: IThemeRepository
  ) { }

  async execute({ dto }: CreateThemeCommand): Promise<any> {
    const newTheme = new ThemeConfig();

    newTheme.generateThemeConfig(dto);

    const createdTheme = await this.themeRepository.create(newTheme);

    return createdTheme.id;
  }
}

export default CreateThemeHandler;
