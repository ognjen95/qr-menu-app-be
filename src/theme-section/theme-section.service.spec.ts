import { Test, TestingModule } from '@nestjs/testing';
import { ThemeSectionService } from './theme-section.service';

describe('ThemeSectionService', () => {
  let service: ThemeSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeSectionService],
    }).compile();

    service = module.get<ThemeSectionService>(ThemeSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
