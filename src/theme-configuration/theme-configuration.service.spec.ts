import { Test, TestingModule } from '@nestjs/testing';
import { ThemeConfigurationService } from './theme-configuration.service';

describe('ThemeConfigurationService', () => {
  let service: ThemeConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeConfigurationService],
    }).compile();

    service = module.get<ThemeConfigurationService>(ThemeConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
