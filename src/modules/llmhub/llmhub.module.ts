import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { SambanovaService } from './sambanova.service';
import { GroqService } from './groq.service';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TogetherAIService } from './togetherai.service';
import { LMStudioService } from './lmstudio.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GroqOpenAIProvider = {
  provide: 'GroqOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('groq.apiKey'),
      baseURL: configService.getOrThrow('groq.baseURL'),
    }),
  inject: [ConfigService],
};

const SambaNovaOpenAIProvider = {
  provide: 'SambaNovaOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('sambanova.apiKey'),
      baseURL: configService.getOrThrow('sambanova.baseURL'),
    }),
  inject: [ConfigService],
};

const TogetherAIOpenAIProvider = {
  provide: 'TogetherAIOpenAI',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('togetherai.apiKey'),
      baseURL: configService.getOrThrow('togetherai.baseURL'),
    }),
  inject: [ConfigService],
};

const LMStudioProvider = {
  provide: 'LMStudio',
  useFactory: (configService: ConfigService) =>
    new OpenAI({
      apiKey: configService.getOrThrow('lmstudio.apiKey'),
      baseURL: configService.getOrThrow('lmstudio.baseURL'),
    }),
  inject: [ConfigService],
};

const GeminiProvider = {
  provide: 'Gemini',
  useFactory: (configService: ConfigService) =>
    new GoogleGenerativeAI(configService.getOrThrow('gemini.apiKey')),
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [
    GeminiService,
    GroqService,
    SambanovaService,
    TogetherAIService,
    LMStudioService,
    GeminiProvider,
    GroqOpenAIProvider,
    SambaNovaOpenAIProvider,
    TogetherAIOpenAIProvider,
    LMStudioProvider,
  ],
  exports: [
    GeminiService,
    GroqService,
    SambanovaService,
    TogetherAIService,
    LMStudioService,
  ],
})
export class LlmHubModule {}
