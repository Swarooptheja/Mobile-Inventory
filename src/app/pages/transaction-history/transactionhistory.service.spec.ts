import { TestBed } from '@angular/core/testing';

import { TransactionhistoryService } from './transactionhistory.service';

describe('TransactionhistoryService', () => {
  let service: TransactionhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
