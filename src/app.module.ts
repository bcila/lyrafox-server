import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
