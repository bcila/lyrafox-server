import { Module } from '@nestjs/common';
import { GooglePlayReviewerService } from './google-play-reviewer.service';
import { GooglePlayReviewerController } from './google-play-reviewer.controller';
import { LMStudioService } from '../llmhub/lmstudio.service';
import { ConfigModule } from '@nestjs/config';
import { LMStudioProvider } from '../llmhub/providers/lmstudio.provider';
import { GroqService } from '../llmhub/groq.service';
import { GroqOpenAIProvider } from '../llmhub/providers/groq.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    GooglePlayReviewerService,
    LMStudioService,
    LMStudioProvider,
    GroqService,
    GroqOpenAIProvider,
  ],
  controllers: [GooglePlayReviewerController],
})
export class GooglePlayReviewerModule {}
