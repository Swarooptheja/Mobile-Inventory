import { TestBed } from '@angular/core/testing';

import { TransactionalApiDataService } from './transactional-api-data.service';

describe('TransactionalApiDataService', () => {
  let service: TransactionalApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionalApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
