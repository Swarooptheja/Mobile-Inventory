import { TestBed } from '@angular/core/testing';

import { SubInvLocatorService } from './sub-inv-locator.service';

describe('SubInvLocatorService', () => {
  let service: SubInvLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubInvLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
