import { Module } from '@nestjs/common';
import { AppStoreReviewerService } from './app-store-reviewer.service';

@Module({
  providers: [AppStoreReviewerService],
})
export class AppStoreReviewerModule {}
