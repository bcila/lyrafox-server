import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GROQ_OPENAI } from '../../../common/constants';

export const GroqOpenAIProvider = {
  provide: GROQ_OPENAI,
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('groq.apiKey'),
      baseURL: configService.getOrThrow('groq.baseURL'),
    }),
  inject: [ConfigService],
};
