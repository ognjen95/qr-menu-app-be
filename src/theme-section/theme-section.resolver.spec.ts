import { Test, TestingModule } from '@nestjs/testing';
import { ThemeSectionResolver } from '../presentation/resolvers/theme/theme-section.resolver';
import { ThemeSectionService } from './theme-section.service';

describe('ThemeSectionResolver', () => {
  let resolver: ThemeSectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeSectionResolver, ThemeSectionService],
    }).compile();

    resolver = module.get<ThemeSectionResolver>(ThemeSectionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
