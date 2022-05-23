import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCounterGateway } from './activity-counter.gateway';

describe('ActivityCounterGateway', () => {
  let gateway: ActivityCounterGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityCounterGateway],
    }).compile();

    gateway = module.get<ActivityCounterGateway>(ActivityCounterGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
