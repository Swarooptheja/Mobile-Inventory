import { Injectable } from '@angular/core';
import { OfflineSaveDataService } from '../offline-save-data/offline-save-data.service';
import { OfflineDataService } from '../offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(
    private saveOfflineData: OfflineSaveDataService,
    private offlineData: OfflineDataService 
  ) { }

  async getDataFromAPI (isDeltaSync:boolean, TableName: string, url: string, fieldName:string, responsibilities: string, typeOfApi: string) {
    try {
      return this.offlineData.createTableForAPI(isDeltaSync, TableName, url, fieldName, responsibilities, typeOfApi);
    } catch (error) {
      console.log(error)
    };
  };
}
