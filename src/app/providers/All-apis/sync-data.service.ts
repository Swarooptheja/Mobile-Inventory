import { Injectable } from '@angular/core';
import { MasterApiDataService } from './master-api-data.service';
import { ConfigApiDataService } from './config-api-data.service';
import { TransactionalApiDataService } from './transactional-api-data.service';

@Injectable({
  providedIn: 'root'
})
export class SyncDataService {

  constructor(
    private masterDataService: MasterApiDataService,
    private configDataService: ConfigApiDataService,
    private transactionDataService: TransactionalApiDataService
  ) { }

  sync(isDeltaSync: boolean) {
    let promiseResult: any = [];
    if (!isDeltaSync) {
      promiseResult = [
        ...this.masterDataService.syncMasterDataAPIs(isDeltaSync),
        ...this.configDataService.syncConfigDataAPIs(isDeltaSync),
        ...this.transactionDataService.syncTransactionDataAPIs(isDeltaSync)
      ]
    }
    else {
      promiseResult = this.transactionDataService.syncTransactionDataAPIs(isDeltaSync)
      
    }
    return promiseResult;
  }
}
