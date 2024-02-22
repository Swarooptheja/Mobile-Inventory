import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsReceiptItemDetailsPage } from './goods-receipt-item-details.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsReceiptItemDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsReceiptItemDetailsPageRoutingModule {}
