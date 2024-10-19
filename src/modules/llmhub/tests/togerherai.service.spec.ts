import { Test, TestingModule } from '@nestjs/testing';
import { TogerheraiService } from '../togetherai.service';

describe('TogerheraiService', () => {
  let service: TogerheraiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TogerheraiService],
    }).compile();

    service = module.get<TogerheraiService>(TogerheraiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
