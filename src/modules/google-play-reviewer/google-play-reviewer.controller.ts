import { Controller, Get } from '@nestjs/common';
import { GooglePlayReviewerService } from './google-play-reviewer.service';
import { LMStudioService } from '../llmhub/lmstudio.service';

@Controller('google-play-reviewer')
export class GooglePlayReviewerController {
  constructor(
    private readonly googlePlayReviewerService: GooglePlayReviewerService,
    private readonly lmStudioService: LMStudioService,
  ) {}

  @Get('report')
  async generateReport() {
    const reviews = this.googlePlayReviewerService.getGooglePlayReviews();
    const report = await this.lmStudioService.generateReport(reviews);
    console.log(report);
    return report;
  }
}
