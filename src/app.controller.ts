import { Controller, Get } from '@nestjs/common';
import { LMStudioService } from './modules/llmhub/lmstudio.service';

@Controller()
export class AppController {
  constructor(private readonly appService: LMStudioService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.test();
  }
}
