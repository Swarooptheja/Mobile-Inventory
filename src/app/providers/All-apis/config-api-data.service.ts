import { Injectable } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { API_CALLS_MESSAGES, Appsettings, RESPONSIBILITIES, TABLE_NAME, TYPE_OF_APIS } from 'src/app/constants/pages/App-settings';

@Injectable({
  providedIn: 'root'
})
export class ConfigApiDataService {
  isDeltaSync:boolean = true;
  constructor(
    private fetchDataService: FetchApiDataService
  ) { }

  //sync all ConfingData Api's
  
  syncConfigDataAPIs(isDeltaSync: boolean) {
    let promiseArray = [
      { presentApi: this.getGLPeriods(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.gl_periods },
      { presentApi: this.getReasons(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.reason },
      { presentApi: this.getInventoryPeriods(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.inventory_periods },
      // { presentApi: this.getPurchasingPeriods(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.purchasing_periods },

      // this.getGLPeriods(isDeltaSync),
      // this.getInventoryPeriods(isDeltaSync),
      // this.getPurchasingPeriods(isDeltaSync),
    ];
    return promiseArray;
  };
    
  getReasons(isDeltaSync: boolean) {
    return this.fetchDataService.getDataFromAPI(isDeltaSync, TABLE_NAME.REASON,  Appsettings.getReasonsUrl, 'Reasons', RESPONSIBILITIES.REASON, TYPE_OF_APIS.REGULAR);
  }

  getGLPeriods(isDeltaSync: boolean) {
    return this.fetchDataService.getDataFromAPI(isDeltaSync, TABLE_NAME.GL_PERIODS, Appsettings.getGLPeriodsUrl, 'GLPeriods', RESPONSIBILITIES.GL_PERIODS,TYPE_OF_APIS.REGULAR );
  }

  getInventoryPeriods(isDeltaSync: boolean) {
    return this.fetchDataService.getDataFromAPI(isDeltaSync, TABLE_NAME.INVENTORY_PERIODS, Appsettings.getInventoryPeriodsUrl, 'InventoryPeriods',RESPONSIBILITIES.INVENTORY_PERIODS, TYPE_OF_APIS.REGULAR);
  }

  getPurchasingPeriods(isDeltaSync: boolean) {
    return this.fetchDataService.getDataFromAPI(isDeltaSync, TABLE_NAME.PURCHASING_PERIODS, Appsettings.getPurchasingPeriodsUrl, 'POPeriods',RESPONSIBILITIES.PURCHASING_PERIODS, TYPE_OF_APIS.REGULAR);
  }
}
