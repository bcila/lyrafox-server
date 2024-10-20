import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { GroqService } from './groq.service';
// import { GeminiService } from './gemini.service';
// import { SambanovaService } from './sambanova.service';
// import { TogetherAIService } from './togetherai.service';
import { LMStudioService } from './lmstudio.service';
// import { GroqOpenAIProvider } from './providers/groq.provider';
// import { GeminiProvider } from './providers/gemini.provider';
// import { SambaNovaOpenAIProvider } from './providers/sambanova.provider';
// import { TogetherAIOpenAIProvider } from './providers/togetherai.provider';
import { LMStudioProvider } from './providers/lmstudio.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    // GroqService,
    // GeminiService,
    // SambanovaService,
    // TogetherAIService,
    LMStudioService,
    // GroqOpenAIProvider,
    // GeminiProvider,
    // SambaNovaOpenAIProvider,
    // TogetherAIOpenAIProvider,
    LMStudioProvider,
  ],
  exports: [
    // GroqService,
    // GeminiService,
    // SambanovaService,
    // TogetherAIService,
    LMStudioService,
  ],
})
export class LlmHubModule {}
