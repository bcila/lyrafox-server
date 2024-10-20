import { Test, TestingModule } from '@nestjs/testing';
import { LMStudioService } from '../lmstudio.service';
import { ConfigService } from '@nestjs/config';

describe('LMStudioService', () => {
  let service: LMStudioService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'lmstudio.apiKey') return 'test-api-key';
      if (key === 'lmstudio.model') return 'test-model';
      if (key === 'lmstudio.baseUrl') return 'test-baseUrl';
      if (key === 'llmhub.systemPrompt') return 'test-prompt';
    }),
  };

  const mockOpenAI = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LMStudioService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'LMStudio',
          useValue: mockOpenAI,
        },
      ],
    }).compile();

    service = module.get<LMStudioService>(LMStudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
