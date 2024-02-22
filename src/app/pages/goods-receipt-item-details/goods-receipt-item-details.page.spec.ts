import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsReceiptItemDetailsPage } from './goods-receipt-item-details.page';

describe('GoodsReceiptItemDetailsPage', () => {
  let component: GoodsReceiptItemDetailsPage;
  let fixture: ComponentFixture<GoodsReceiptItemDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoodsReceiptItemDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
