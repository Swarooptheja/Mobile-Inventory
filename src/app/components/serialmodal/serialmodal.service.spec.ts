import { TestBed } from '@angular/core/testing';

import { SerialmodalService } from './serialmodal.service';

describe('SerialmodalService', () => {
  let service: SerialmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerialmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
