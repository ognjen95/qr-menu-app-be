import { Module } from '@nestjs/common';
import { ThemeConfigurationResolver } from '../../resolvers/theme/theme-configuration.resolver';
import { THEME_CONFIG_REPOSITORY_TOKEN } from '../../../application/common/constants/tokens';
import { ThemeRepository } from '../../../infrastructure/repositories/theme/theme.repository';
import { CqrsModule } from '@nestjs/cqrs';
import SavethemeHandler from '../../../application/commands/theme/save-theme/save-theme.handler';
import FindThemeByIdHandler from '../../../application/queries/theme/find-theme-by-tenant-id/find-theme-by-id.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    ThemeConfigurationResolver,
    SavethemeHandler,
    FindThemeByIdHandler,
    {
      provide: THEME_CONFIG_REPOSITORY_TOKEN,
      useClass: ThemeRepository,
    },
  ],
})
export class ThemeConfigurationModule {}
