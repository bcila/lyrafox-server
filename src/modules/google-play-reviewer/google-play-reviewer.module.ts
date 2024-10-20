import { Module } from '@nestjs/common';
import { GooglePlayReviewerService } from './google-play-reviewer.service';

@Module({
  providers: [GooglePlayReviewerService],
})
export class GooglePlayReviewerModule {}
