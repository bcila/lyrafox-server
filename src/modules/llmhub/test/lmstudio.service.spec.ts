import { Test, TestingModule } from '@nestjs/testing';
import { LMStudioService } from '../lmstudio.service';

describe('LMStudioService', () => {
  let service: LMStudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LMStudioService],
    }).compile();

    service = module.get<LMStudioService>(LMStudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
