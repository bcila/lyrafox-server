import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const GroqOpenAIProvider = {
  provide: 'GroqOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('groq.apiKey'),
      baseURL: configService.getOrThrow('groq.baseURL'),
    }),
  inject: [ConfigService],
};
