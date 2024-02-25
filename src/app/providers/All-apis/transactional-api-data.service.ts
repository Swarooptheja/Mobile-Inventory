import { Injectable } from '@angular/core';
import { API_CALLS_MESSAGES, Appsettings, RESPONSIBILITIES, TABLE_NAME, TYPE_OF_APIS } from 'src/app/constants/pages/App-settings';
import { FetchApiDataService } from './fetch-api-data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionalApiDataService {

  constructor(
    private fetchapiData: FetchApiDataService
  ) { }

  syncTransactionDataAPIs(isDeltaSync: boolean) {
    let promiseArray: any = [
      { presentApi: this.getDocsForReceiving(isDeltaSync), apimessage: API_CALLS_MESSAGES.goods_receipt_docs_receiving },
      {presenApi: this.getSerialTableType(isDeltaSync), apimessage: API_CALLS_MESSAGES.serials},
      {presenApi: this.getLotTableType(isDeltaSync), apimessage: API_CALLS_MESSAGES.lot},      
        ];

    return promiseArray;
  }

  getDocsForReceiving(isDeltaSync: boolean) {
    return this.fetchapiData.getDataFromAPI(isDeltaSync, TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING, Appsettings.goodsReceiptUrl, 'Docs4Receiving', RESPONSIBILITIES.GOODS_RECEIPT_DOCS_RECEIVING, TYPE_OF_APIS.REGULAR_TRANSACTIONAL);
  }
  getSerialTableType(isDeltaSync: boolean) {
    return this.fetchapiData.getDataFromAPI(isDeltaSync, TABLE_NAME.SERIALS, Appsettings.getserialTableTypeUrl, '', RESPONSIBILITIES.SERIALS, TYPE_OF_APIS.REGULAR_TRANSACTIONAL);
  }
  getLotTableType(isDeltaSync: boolean) {
    return this.fetchapiData.getDataFromAPI(isDeltaSync, TABLE_NAME.LOT, Appsettings.getLotsTableType, '', RESPONSIBILITIES.LOT, TYPE_OF_APIS.REGULAR_TRANSACTIONAL);
  };
  
}
