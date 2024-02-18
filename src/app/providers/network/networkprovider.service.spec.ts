import { TestBed } from '@angular/core/testing';

import { NetworkproviderService } from './networkprovider.service';

describe('NetworkproviderService', () => {
  let service: NetworkproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
