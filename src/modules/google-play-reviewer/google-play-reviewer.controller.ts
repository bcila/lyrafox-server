import { Controller, Get } from '@nestjs/common';
import { GooglePlayReviewerService } from './google-play-reviewer.service';
import { LMStudioService } from '../llmhub/lmstudio.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Google Play Reviewer')
@ApiBearerAuth() // Swagger UI
@Controller('google-play-reviewer')
export class GooglePlayReviewerController {
  constructor(
    private readonly googlePlayReviewerService: GooglePlayReviewerService,
    private readonly lmStudioService: LMStudioService,
  ) {}

  @Get('report')
  async generateReport() {
    console.log('hi');
    const reviews = this.googlePlayReviewerService.getGooglePlayReviews();
    const report = await this.lmStudioService.generateReport(reviews);
    console.log(report);
    return report;
  }
}
