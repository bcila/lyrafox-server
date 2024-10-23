import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlayReviewerController } from './google-play-reviewer.controller';

describe('GooglePlayReviewerController', () => {
  let controller: GooglePlayReviewerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GooglePlayReviewerController],
    }).compile();

    controller = module.get<GooglePlayReviewerController>(
      GooglePlayReviewerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
