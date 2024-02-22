import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodsReceiptItemsPageRoutingModule } from './goods-receipt-items-routing.module';

import { GoodsReceiptItemsPage } from './goods-receipt-items.page';
import { SharedModule } from 'src/app/components/sharedmodule/shared/shared.module';
import { FiltercustompipeModule } from 'src/app/components/Custompipes/filtercustompipe/filtercustompipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodsReceiptItemsPageRoutingModule,
    SharedModule,
    FiltercustompipeModule
  ],
  declarations: [GoodsReceiptItemsPage]
})
export class GoodsReceiptItemsPageModule {}
