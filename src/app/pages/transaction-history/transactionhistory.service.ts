import { Injectable } from '@angular/core';
import { QUERIES } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionhistoryService {

  constructor(
    private offlineDataService: OfflineDataService,
  ) { }


  async getAllTransactionData ():Promise<any> {
    try {
      const query = QUERIES.TRANSACTION_HISTORY.GET;
      const allTransactionData = await this.offlineDataService.executeQueryWithoutParams(query);
      return allTransactionData
    } catch (error) {
      console.log(error);
    }
  }


}
