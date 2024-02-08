import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThemeSectionService } from '../../../theme-section/theme-section.service';
import { CreateThemeSectionInput } from '../../../domain/theme/theme-sections/dto/create-theme-section.input';
import { UpdateThemeSectionInput } from '../../../domain/theme/theme-sections/dto/update-theme-section.input';
import { ThemeSectionEntity } from '../../../domain/theme/theme-config/entities/theme-configuration.entity';

@Resolver(() => ThemeSectionEntity)
export class ThemeSectionResolver {
  constructor(private readonly themeSectionService: ThemeSectionService) {}

  @Mutation(() => ThemeSectionEntity)
  createThemeSection(
    @Args('createThemeSectionInput')
    createThemeSectionInput: CreateThemeSectionInput,
  ) {
    return this.themeSectionService.create(createThemeSectionInput);
  }

  @Query(() => [ThemeSectionEntity], { name: 'themeSection' })
  findAll() {
    return this.themeSectionService.findAll();
  }

  @Query(() => ThemeSectionEntity, { name: 'themeSection' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.themeSectionService.findOne(id);
  }

  @Mutation(() => ThemeSectionEntity)
  updateThemeSection(
    @Args('updateThemeSectionInput')
    updateThemeSectionInput: UpdateThemeSectionInput,
  ) {
    return this.themeSectionService.update(
      updateThemeSectionInput.id,
      updateThemeSectionInput,
    );
  }

  @Mutation(() => ThemeSectionEntity)
  removeThemeSection(@Args('id', { type: () => Int }) id: number) {
    return this.themeSectionService.remove(id);
  }
}
