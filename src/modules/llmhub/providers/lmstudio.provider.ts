import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { LM_STUDIO } from '../../../common/constants';

export const LMStudioProvider = {
  provide: LM_STUDIO,
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('lmstudio.apiKey'),
      baseURL: configService.getOrThrow('lmstudio.baseURL'),
    }),
  inject: [ConfigService],
};
