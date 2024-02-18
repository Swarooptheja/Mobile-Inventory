import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoodsReceiptPoListPage } from './goods-receipt-po-list.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsReceiptPoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsReceiptPoListPageRoutingModule {}
