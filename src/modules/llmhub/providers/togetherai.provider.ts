import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const TogetherAIOpenAIProvider = {
  provide: 'TogetherAIOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('togetherai.apiKey'),
      baseURL: configService.getOrThrow('togetherai.baseURL'),
    }),
  inject: [ConfigService],
};
