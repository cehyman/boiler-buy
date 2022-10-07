import { TestBed } from '@angular/core/testing';

import { DeleteAccountService } from './delete-account.service';

describe('DeleteAccountService', () => {
  let service: DeleteAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
