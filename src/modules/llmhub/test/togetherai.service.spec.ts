import { Test, TestingModule } from '@nestjs/testing';
import { TogetherAIService } from '../togetherai.service';

describe('TogetherAIService', () => {
  let service: TogetherAIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TogetherAIService],
    }).compile();

    service = module.get<TogetherAIService>(TogetherAIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
