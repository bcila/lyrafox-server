import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI } from '../../../common/constants';

export const GeminiProvider = {
  provide: GEMINI,
  useFactory: (configService: ConfigService) =>
    new GoogleGenerativeAI(configService.getOrThrow('gemini.apiKey')),
  inject: [ConfigService],
};
