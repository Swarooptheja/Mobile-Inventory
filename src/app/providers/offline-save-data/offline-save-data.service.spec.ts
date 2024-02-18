import { TestBed } from '@angular/core/testing';

import { OfflineSaveDataService } from './offline-save-data.service';

describe('OfflineSaveDataService', () => {
  let service: OfflineSaveDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineSaveDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
