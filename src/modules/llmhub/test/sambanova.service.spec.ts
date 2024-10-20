import { Test, TestingModule } from '@nestjs/testing';
import { SambanovaService } from '../sambanova.service';
import { ConfigService } from '@nestjs/config';

describe('SambanovaService', () => {
  let service: SambanovaService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'sambanova.apiKey') return 'test-api-key';
      if (key === 'sambanova.model') return 'test-model';
      if (key === 'llmhub.systemPrompt') return 'test-prompt';
      throw new Error(`Configuration key "${key}" does not exist`);
    }),
  };

  const mockOpenAI = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SambanovaService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'SambaNovaOpenAI',
          useValue: mockOpenAI,
        },
      ],
    }).compile();

    service = module.get<SambanovaService>(SambanovaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
