import { Injectable, Inject } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GroqService {
  private readonly model: string;
  private readonly systemPrompt: string;

  constructor(
    @Inject('GroqOpenAI') private readonly client: OpenAI,
    private readonly configService: ConfigService,
  ) {
    this.model = configService.get<string>('groq.model');
    this.systemPrompt = configService.get<string>('llmhub.systemPrompt');
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

    // fs.writeFile('./report.md', response.choices[0].message.content, (err) => {
    //   if (err) {
    //     console.error('Error writing to file', err);
    //   } else {
    //     console.log('Report written to report.md successfully.');
    //   }
    // });
    return response.choices[0].message.content;
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
    console.log(response.choices);

    return response;
  }
}
