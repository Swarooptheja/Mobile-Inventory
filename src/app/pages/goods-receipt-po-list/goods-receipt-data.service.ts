import { Injectable } from '@angular/core';
import { QUERIES } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsReceiptDataService {

  constructor(
    private offlineDataService: OfflineDataService
  ) { }

  getReceiptPurchaseOrdersListFromDB() {
  return this.offlineDataService.executeQueryWithoutParams(QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDERS_LIST)

  }
}
