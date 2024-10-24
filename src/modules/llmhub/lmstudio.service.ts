import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import { LM_STUDIO } from '../../common/constants';

@Injectable()
export class LMStudioService {
  private readonly model: string;
  private readonly systemPrompt: string;

  constructor(
    @Inject(LM_STUDIO) private readonly client: OpenAI,
    private readonly configService: ConfigService,
  ) {
    this.model = this.configService.get<string>('lmstudio.model');
    this.systemPrompt = this.configService.get<string>('llmhub.systemPrompt');
  }

  async generateReport(data) {
    const response = await this.client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: JSON.stringify(data),
        },
        {
          role: 'system',
          content: this.systemPrompt,
        },
      ],
      model: this.model,
    });

    fs.writeFile('./report.md', response.choices[0].message.content, (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Report written to report.md successfully.');
      }
    });
    return response.choices[0].message;
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
