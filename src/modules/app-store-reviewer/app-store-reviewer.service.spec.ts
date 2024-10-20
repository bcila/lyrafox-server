import { Test, TestingModule } from '@nestjs/testing';
import { AppStoreReviewerService } from './app-store-reviewer.service';

describe('AppStoreReviewerService', () => {
  let service: AppStoreReviewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppStoreReviewerService],
    }).compile();

    service = module.get<AppStoreReviewerService>(AppStoreReviewerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
