import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SAMBANOVA_OPENAI } from '../../../common/constants';

export const SambaNovaOpenAIProvider = {
  provide: SAMBANOVA_OPENAI,
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('sambanova.apiKey'),
      baseURL: configService.getOrThrow('sambanova.baseURL'),
    }),
  inject: [ConfigService],
};
