import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodsReceiptPoListPageRoutingModule } from './goods-receipt-po-list-routing.module';

import { GoodsReceiptPoListPage } from './goods-receipt-po-list.page';
import { SharedModule } from 'src/app/components/sharedmodule/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FiltercustompipeModule } from 'src/app/components/Custompipes/filtercustompipe/filtercustompipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodsReceiptPoListPageRoutingModule,
    SharedModule,
    ScrollingModule,
    FiltercustompipeModule
  ],
  declarations: [GoodsReceiptPoListPage]
})
export class GoodsReceiptPoListPageModule {}
