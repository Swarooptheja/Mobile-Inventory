import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsReceiptItemsPage } from './goods-receipt-items.page';

describe('GoodsReceiptItemsPage', () => {
  let component: GoodsReceiptItemsPage;
  let fixture: ComponentFixture<GoodsReceiptItemsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoodsReceiptItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
