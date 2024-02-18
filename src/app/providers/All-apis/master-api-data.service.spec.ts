import { TestBed } from '@angular/core/testing';

import { MasterApiDataService } from './master-api-data.service';

describe('MasterApiDataService', () => {
  let service: MasterApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
