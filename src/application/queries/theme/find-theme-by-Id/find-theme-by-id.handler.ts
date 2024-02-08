import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindThemeByIdQuery } from './find-theme-by-id.query';
import { IThemeRepository } from '../../../common/interfaces/theme/theme-repository.interface';
import { ThemeConfig } from '../../../../domain/theme/theme-config';
import { Inject } from '@nestjs/common';
import { THEME_CONFIG_REPOSITORY_TOKEN } from '../../../common/constants/tokens';

@QueryHandler(FindThemeByIdQuery)
class FindThemeByIdHandler implements IQueryHandler<FindThemeByIdQuery> {
  constructor(
    @Inject(THEME_CONFIG_REPOSITORY_TOKEN)
    private readonly themeRepository: IThemeRepository
  ) { }

  async execute({ id }: FindThemeByIdQuery): Promise<ThemeConfig> {
    const createdTheme = await this.themeRepository.findById(id);

    return createdTheme;
  }
}

export default FindThemeByIdHandler;
