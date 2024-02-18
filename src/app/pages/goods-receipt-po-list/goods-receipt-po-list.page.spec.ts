import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsReceiptPoListPage } from './goods-receipt-po-list.page';

describe('GoodsReceiptPoListPage', () => {
  let component: GoodsReceiptPoListPage;
  let fixture: ComponentFixture<GoodsReceiptPoListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoodsReceiptPoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
