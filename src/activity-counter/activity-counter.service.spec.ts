import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCounterService } from './activity-counter.service';

describe('ActivityCounterService', () => {
  let service: ActivityCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityCounterService],
    }).compile();

    service = module.get<ActivityCounterService>(ActivityCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
