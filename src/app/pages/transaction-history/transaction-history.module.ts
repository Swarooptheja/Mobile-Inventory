import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionHistoryPageRoutingModule } from './transaction-history-routing.module';

import { TransactionHistoryPage } from './transaction-history.page';
import { SharedModule } from 'src/app/components/sharedmodule/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [TransactionHistoryPage]
})
export class TransactionHistoryPageModule {}
