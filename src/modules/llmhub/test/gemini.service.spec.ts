import { Test, TestingModule } from '@nestjs/testing';
import { GeminiService } from '../gemini.service';
import { ConfigService } from '@nestjs/config';

describe('GeminiService', () => {
  let service: GeminiService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'gemini.apiKey') return 'test-api-key';
      if (key === 'gemini.model') return 'test-model'; // Mock model key
      if (key === 'llmhub.systemPrompt') return 'test-prompt'; // Mock system prompt key
      throw new Error(`Configuration key "${key}" does not exist`);
    }),
  };

  const mockGoogleGenerativeAI = {
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('Generated content'),
        },
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: 'Gemini', useValue: mockGoogleGenerativeAI },
      ],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
