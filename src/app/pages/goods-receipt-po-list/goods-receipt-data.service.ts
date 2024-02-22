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

   getReceiptPurchaseOrdersListFromDB(searchText = '', currentPage = 1 ):any {
    try {
      let params = [`${searchText}%`, `${searchText}%`, `${searchText}%`,`${searchText}%`,`${searchText}%`,
      `${searchText}%`, (currentPage - 1) * 50];
      return this.offlineDataService.executeQueryWithParams(QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDERS_LIST_WITH_LIMIT, params);
     
      
    } catch (error) {
       console.error(error);
    }

  }

  getReceiptPurchaseOrdersItemsFromDB(poHeaderId: string, poReleaseId: string, shipmentHeaderId: string, rmaNumber: string): any {
    try {
      const query = QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDER_ITEMS;
      const params = [poHeaderId, poReleaseId, shipmentHeaderId, rmaNumber];
      return this.offlineDataService.executeQueryWithParams(query, params);
    } catch (error) {
      console.log(error);
    }
  }
}
