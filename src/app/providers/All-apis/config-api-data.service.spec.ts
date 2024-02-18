import { TestBed } from '@angular/core/testing';

import { ConfigApiDataService } from './config-api-data.service';

describe('ConfigApiDataService', () => {
  let service: ConfigApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
