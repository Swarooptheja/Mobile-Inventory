import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NetworkproviderService {
	currentNetworkStatus: boolean = false;
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
    // this.status.next(this.currentNetworkStatus)

  }

  isOnline (): boolean {
    return this.currentNetworkStatus;
  }
 
}
