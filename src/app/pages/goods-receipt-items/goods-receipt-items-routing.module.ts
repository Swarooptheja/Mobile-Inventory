import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsReceiptItemsPage } from './goods-receipt-items.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsReceiptItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsReceiptItemsPageRoutingModule {}
