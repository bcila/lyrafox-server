import { Test, TestingModule } from '@nestjs/testing';
import { GroqService } from '../groq.service';
import { ConfigService } from '@nestjs/config';

describe('GroqService', () => {
  let service: GroqService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'groq.apiKey') return 'test-api-key';
      if (key === 'groq.model') return 'test-model';
      if (key === 'llmhub.systemPrompt') return 'test-prompt';
      throw new Error(`Configuration key "${key}" does not exist`);
    }),
  };

  const mockOpenAI = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroqService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        { provide: 'GroqOpenAI', useValue: mockOpenAI },
      ],
    }).compile();

    service = module.get<GroqService>(GroqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
