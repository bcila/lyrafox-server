import { Test, TestingModule } from '@nestjs/testing';
import { LocalLmstudioService } from '../lmstudio.service';

describe('LocalLmstudioService', () => {
  let service: LocalLmstudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalLmstudioService],
    }).compile();

    service = module.get<LocalLmstudioService>(LocalLmstudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
