import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoodsReceiptItemDetailsPageRoutingModule } from './goods-receipt-item-details-routing.module';

import { GoodsReceiptItemDetailsPage } from './goods-receipt-item-details.page';
import { SharedModule } from 'src/app/components/sharedmodule/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoodsReceiptItemDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [GoodsReceiptItemDetailsPage]
})
export class GoodsReceiptItemDetailsPageModule {}
