import { Inject, Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private client: GenerativeModel;
  private readonly model: string;
  private readonly systemPrompt: string;

  constructor(
    @Inject('Gemini') private readonly genAI: GoogleGenerativeAI,
    private readonly configService: ConfigService,
  ) {
    this.model = this.configService.get<string>('gemini.model');
    this.systemPrompt = this.configService.get<string>('llmhub.systemPrompt');
    this.client = genAI.getGenerativeModel({
      model: this.model,
      systemInstruction: this.systemPrompt,
    });
  }

  async test() {
    const prompt = 'Write a short story about a magic backpack.';

    const result = await this.client.generateContent(prompt);
    console.log(result.response.text());
    return result;
  }
}
