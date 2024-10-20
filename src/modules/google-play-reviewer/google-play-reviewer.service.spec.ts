import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlayReviewerService } from './google-play-reviewer.service';

describe('GooglePlayReviewerService', () => {
  let service: GooglePlayReviewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglePlayReviewerService],
    }).compile();

    service = module.get<GooglePlayReviewerService>(GooglePlayReviewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
