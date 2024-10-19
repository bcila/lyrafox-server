import { Test, TestingModule } from '@nestjs/testing';
import { SambanovaService } from '../sambanova.service';

describe('SambanovaService', () => {
  let service: SambanovaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SambanovaService],
    }).compile();

    service = module.get<SambanovaService>(SambanovaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
