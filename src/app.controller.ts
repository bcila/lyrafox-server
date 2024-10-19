import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GroqService } from './modules/llmhub/groq.service';
import { SambanovaService } from './modules/llmhub/sambanova.service';
import { LMStudioService } from './modules/llmhub/lmstudio.service';
import { TogetherAIService } from './modules/llmhub/togetherai.service';
import { GeminiService } from './modules/llmhub/gemini.service';

@Controller()
export class AppController {
  constructor(private readonly appService: LMStudioService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.test();
  }
}
