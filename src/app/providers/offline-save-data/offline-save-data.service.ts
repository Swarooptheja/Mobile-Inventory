import { Injectable } from '@angular/core';
import { OfflineDataService } from '../offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class OfflineSaveDataService {

  constructor(
    private offlineDataService: OfflineDataService,
  ) { }

 
	checkTableExist(tableName: string) {
		return this.offlineDataService.executeQuery('SELECT name FROM sqlite_master WHERE type=? AND name=?', ['table', tableName]);
	}
}
