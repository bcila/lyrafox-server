import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const GeminiProvider = {
  provide: 'Gemini',
  useFactory: (configService: ConfigService) =>
    new GoogleGenerativeAI(configService.getOrThrow('gemini.apiKey')),
  inject: [ConfigService],
};
