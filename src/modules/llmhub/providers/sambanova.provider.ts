import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const SambaNovaOpenAIProvider = {
  provide: 'SambaNovaOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('sambanova.apiKey'),
      baseURL: configService.getOrThrow('sambanova.baseURL'),
    }),
  inject: [ConfigService],
};
