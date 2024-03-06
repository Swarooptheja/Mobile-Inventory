import { Injectable } from '@angular/core';
import { QUERIES, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import { GlobalvariablesService } from 'src/app/providers/globalvariables/globalvariables.service';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class SubInvLocatorService {

  constructor(
    private globalVar: GlobalvariablesService,
    private offlineDataService: OfflineDataService,
  ) { }

  getRestrictedSubInventoryList(itemNumber:any):any {
    try {
      let query = QUERIES.RESTRICTED_SUBINVENTORY.GET;
      return this.offlineDataService.executeQueryWithParams(query, [this.globalVar.getInvOrgId(), itemNumber]);    
    } catch (error) {
      console.error(error);
    }
  }

  getRestrictedLocatorsList(itemNumber:any):any {
    try {
      let query = QUERIES.RESTRICTED_LOCATOR.GET;
      return this.offlineDataService.executeQueryWithParams(query,[this.globalVar.getInvOrgId(), itemNumber]);
    } catch (error) {
      console.error(error);
    }
  }         
  getSubInvenoryList(table:string):any {
    try {
      let query:any;
      if(table === TABLE_NAME.SUBINVENTORY){
         query = QUERIES.SUBINVENTORY.GET;
      }
      return this.offlineDataService.executeQueryWithParams(query,[this.globalVar.getInvOrgId()]);

    } catch (error) {
      console.error(error);
    }
  }
  getLocatorList(subInventoryCode:any):any {
    try {
      const query = QUERIES.LOCATOR.GET;
      return this.offlineDataService.executeQueryWithParams(query, [subInventoryCode]);

    } catch (error) {
      console.error(error);
    }
  }


}
