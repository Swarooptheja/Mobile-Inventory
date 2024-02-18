import { TestBed } from '@angular/core/testing';

import { GoodsReceiptDataService } from './goods-receipt-data.service';

describe('GoodsReceiptDataService', () => {
  let service: GoodsReceiptDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsReceiptDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
