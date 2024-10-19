import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LMStudioService {
  private readonly model: string;
  private readonly systemPrompt: string;

  constructor(
    @Inject('LMStudio') private readonly client: OpenAI,
    private readonly configService: ConfigService,
  ) {
    this.model = this.configService.get<string>('lmstudio.model');
    this.systemPrompt = this.configService.get<string>('llmhub.systemPrompt');
  }

  async test() {
    const response = await this.client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'what you think about ATATURK, give me answer in Turkish',
        },
        {
          role: 'system',
          content: this.systemPrompt,
        },
      ],
      model: this.model,
    });

    return response;
  }
}
