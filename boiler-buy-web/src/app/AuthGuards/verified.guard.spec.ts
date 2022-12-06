import { TestBed } from '@angular/core/testing';

import { VerifiedGuard } from './verified.guard';

describe('VerifiedGuard', () => {
  let guard: VerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
