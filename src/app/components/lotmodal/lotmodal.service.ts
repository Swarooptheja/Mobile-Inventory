import { Injectable } from '@angular/core';
import { QUERIES } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class LotmodalService {

  constructor(
    private offlineDataService: OfflineDataService
  ) { };

  lotNumberList (itemNumber:string):any {
    try {
      const query = QUERIES.LOT.GET;
      return this.offlineDataService.executeQueryWithParams(query, [itemNumber])
    } catch (error) {
      console.error(error);
      
    }
  }
}
