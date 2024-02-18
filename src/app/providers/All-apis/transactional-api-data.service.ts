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
        ];

    return promiseArray;
  }

  getDocsForReceiving(isDeltaSync: boolean) {
    return this.fetchapiData.getDataFromAPI(isDeltaSync, TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING, Appsettings.goodsReceiptUrl, 'Docs4Receiving', RESPONSIBILITIES.GOODS_RECEIPT_DOCS_RECEIVING, TYPE_OF_APIS.REGULAR_TRANSACTIONAL);
  }
}
