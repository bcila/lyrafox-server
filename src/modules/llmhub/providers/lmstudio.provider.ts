import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export const LMStudioProvider = {
  provide: 'LMStudio',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('lmstudio.apiKey'),
      baseURL: configService.getOrThrow('lmstudio.baseURL'),
    }),
  inject: [ConfigService],
};
