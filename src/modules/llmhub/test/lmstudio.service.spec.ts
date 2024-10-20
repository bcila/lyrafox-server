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

  // const openAI200Response = {
  //   id: 'chatcmpl-xx7p4s11ris1kv1fw0z0oj',
  //   object: 'chat.completion',
  //   created: 1729434851,
  //   model: 'gemma-2-9b-instruct',
  //   choices: [
  //     {
  //       index: 0,
  //       message: {
  //         role: 'assistant',
  //         content:
  //           "Benim gibi bir kedi olarak siyasette yorum yapamam! 😸 Ama insanların Atatürk'ü ne kadar sevdiğini duyduğumu biliyorum. Onu çok saygı göstermeleri ve onun mirasına değer verdikleri açıkça görülüyor.  🇹🇷✨ \n\nUmarım bu cevap size yardımcı olur!\n",
  //       },
  //       logprobs: null,
  //       finish_reason: 'stop',
  //     },
  //   ],
  //   usage: {
  //     prompt_tokens: 38,
  //     completion_tokens: 68,
  //     total_tokens: 106,
  //   },
  //   system_fingerprint: 'gemma-2-9b-instruct',
  // };

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
