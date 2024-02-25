import { TestBed } from '@angular/core/testing';

import { LotmodalService } from './lotmodal.service';

describe('LotmodalService', () => {
  let service: LotmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
