import { Module } from '@nestjs/common';
import { LlmHubModule } from './modules/llmhub/llmhub.module';
import { GooglePlayReviewerModule } from './modules/google-play-reviewer/google-play-reviewer.module';
import { AppStoreReviewerModule } from './modules/app-store-reviewer/app-store-reviewer.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    LlmHubModule,
    GooglePlayReviewerModule,
    AppStoreReviewerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}
