import { Module } from '@nestjs/common';
import { LlmHubModule } from './modules/llmhub/llmhub.module';
import { ConfigModule } from '@nestjs/config';
import { GooglePlayReviewerModule } from './modules/google-play-reviewer/google-play-reviewer.module';
import { AppStoreReviewerModule } from './modules/app-store-reviewer/app-store-reviewer.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import llmhubConfig from './config/llmhub.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception-filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [llmhubConfig],
    }),
    LlmHubModule,
    GooglePlayReviewerModule,
    AppStoreReviewerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
