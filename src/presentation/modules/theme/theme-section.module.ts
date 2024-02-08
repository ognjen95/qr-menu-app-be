import { Module } from '@nestjs/common';
import { ThemeSectionService } from '../../../theme-section/theme-section.service';
import { ThemeSectionResolver } from '../../resolvers/theme/theme-section.resolver';

@Module({
  providers: [ThemeSectionResolver, ThemeSectionService],
})
export class ThemeSectionModule {}
