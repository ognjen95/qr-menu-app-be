import { Module } from '@nestjs/common';
import { ThemeConfigurationResolver } from '../../resolvers/theme/theme-configuration.resolver';
import { THEME_CONFIG_REPOSITORY_TOKEN } from '../../../application/common/constants/tokens';
import { ThemeRepository } from '../../../infrastructure/repositories/theme/theme.repository';
import { CqrsModule } from '@nestjs/cqrs';
import CreateThemeHandler from '../../../application/commands/theme/create-theme/create-theme.handler';
import FindThemeByIdHandler from '../../../application/queries/theme/find-theme-by-Id/find-theme-by-id.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    ThemeConfigurationResolver,
    CreateThemeHandler,
    FindThemeByIdHandler,
    {
      provide: THEME_CONFIG_REPOSITORY_TOKEN,
      useClass: ThemeRepository,
    },
  ],
})
export class ThemeConfigurationModule {}
