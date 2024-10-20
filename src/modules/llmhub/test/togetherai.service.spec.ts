import { Test, TestingModule } from '@nestjs/testing';
import { TogetherAIService } from '../togetherai.service';
import { ConfigService } from '@nestjs/config';

describe('TogetherAIService', () => {
  let service: TogetherAIService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'togerherai.apiKey') return 'test-api-key';
      if (key === 'togetherai.model') return 'test-model';
      if (key === 'llmhub.systemPrompt') return 'test-prompt';
    }),
  };

  const mockOpenAI = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TogetherAIService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'TogetherAIOpenAI',
          useValue: mockOpenAI,
        },
      ],
    }).compile();

    service = module.get<TogetherAIService>(TogetherAIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
