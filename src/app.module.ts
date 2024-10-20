import { Module } from '@nestjs/common';
import { LlmHubModule } from './modules/llmhub/llmhub.module';
import { ConfigModule } from '@nestjs/config';
import { GooglePlayReviewerModule } from './modules/google-play-reviewer/google-play-reviewer.module';
import { AppStoreReviewerModule } from './modules/app-store-reviewer/app-store-reviewer.module';
import llmhubConfig from './config/llmhub.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [llmhubConfig],
    }),
    LlmHubModule,
    GooglePlayReviewerModule,
    AppStoreReviewerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
