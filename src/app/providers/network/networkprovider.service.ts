import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class NetworkproviderService {
	currentNetworkStatus: boolean = false;
  // eventIsUserOnline = new Subject<any>();
   eventIsUserOnline = new BehaviorSubject<boolean>(false);
	// private status: BehaviorSubject<boolean> = new BehaviorSubject <boolean>(false);
  constructor() { 
    Network.addListener('networkStatusChange', status => {
      this.currentNetworkStatus = status.connected; 
      console.warn(this.currentNetworkStatus, 'theja')
    });
    this.logCurrentNetworkStatus();
  }
  
  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();
    console.log('Network status:', status);
    this.currentNetworkStatus = status.connected;
    this.checkUserOnline()
    // this.status.next(this.currentNetworkStatus)

  }

  isOnline (): boolean {
    return this.currentNetworkStatus;
  };

  checkUserOnline () {
    console.log('thejaswroo', this.currentNetworkStatus)
    this.eventIsUserOnline.next(this.currentNetworkStatus);
  }
 
}
