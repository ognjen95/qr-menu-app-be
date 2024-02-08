import { Test, TestingModule } from '@nestjs/testing';
import { ThemeConfigurationResolver } from '../presentation/resolvers/theme/theme-configuration.resolver';
import { ThemeConfigurationService } from './theme-configuration.service';

describe('ThemeConfigurationResolver', () => {
  let resolver: ThemeConfigurationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeConfigurationResolver, ThemeConfigurationService],
    }).compile();

    resolver = module.get<ThemeConfigurationResolver>(ThemeConfigurationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
