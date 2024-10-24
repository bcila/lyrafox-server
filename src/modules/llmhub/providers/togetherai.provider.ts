import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { TOGETHERAI_OPENAI } from '../../../common/constants';

export const TogetherAIOpenAIProvider = {
  provide: TOGETHERAI_OPENAI,
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('togetherai.apiKey'),
      baseURL: configService.getOrThrow('togetherai.baseURL'),
    }),
  inject: [ConfigService],
};
