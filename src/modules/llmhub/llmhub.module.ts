import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { SambanovaService } from './sambanova.service';
import { GroqService } from './groq.service';
import { ConfigModule } from '@nestjs/config';
import { TogetherAIService } from './togetherai.service';
import { LMStudioService } from './lmstudio.service';
import { LMStudioProvider } from './providers/lmstudio.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { TogetherAIOpenAIProvider } from './providers/togetherai.provider';
import { SambaNovaOpenAIProvider } from './providers/sambanova.provider';
import { GroqOpenAIProvider } from './providers/groq.provider';

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
