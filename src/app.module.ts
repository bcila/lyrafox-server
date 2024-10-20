import { Module } from '@nestjs/common';
import { LlmHubModule } from './modules/llmhub/llmhub.module';
import { ConfigModule } from '@nestjs/config';
import llmhubConfig from './config/llmhub.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [llmhubConfig],
    }),
    LlmHubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
