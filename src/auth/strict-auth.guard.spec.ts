import { StrictAuthGuard } from './strict-auth.guard';

describe('StrictAuthGuard', () => {
  it('should be defined', () => {
    expect(new StrictAuthGuard()).toBeDefined();
  });
});
