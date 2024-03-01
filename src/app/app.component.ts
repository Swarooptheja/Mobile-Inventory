import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { OfflineDataService } from './providers/offline/offline-data.service';
import { NavController,IonMenu, AlertController } from '@ionic/angular';
import { UiProviderService } from './providers/ui/ui-provider.service';
import { CONFIRM_MESSAGES, CONSTANTS, MESSAGE, ROUTE_PATHS } from './constants/pages/App-settings';
import { register } from 'swiper/element/bundle';
import { GlobalvariablesService } from './providers/globalvariables/globalvariables.service';
import { SyncDataService } from './providers/All-apis/sync-data.service';
import { NetworkproviderService } from './providers/network/networkprovider.service';
import { interval } from 'rxjs';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: string = '';
  inventoryOrgCode: string = ''
  @ViewChild('mainMenu')menu!:IonMenu;
  isOnline:boolean = false;
  constructor(
    private storage: Storage,
    private offlineDataService: OfflineDataService,
    private navCtrl: NavController,
    private uiProvider: UiProviderService,
    private alertCtrl: AlertController,
    private glovar: GlobalvariablesService,
    private syncDataService: SyncDataService,
    private netWorkProvider: NetworkproviderService
  ) {
    this.eventOnline()
  }

  eventOnline () {
    this.netWorkProvider.eventIsUserOnline.subscribe((online:any)=>{
      if(online) {
        this.isOnline = online;
        this.refreshInterval()
      }
    })
  }
  async ngOnInit() {
    await this.storage.create();
  }

  ngAfterViewInit (){
    this.username = this.glovar.getUsername()
    this.inventoryOrgCode = this.glovar.getOrganisationname();
    
  }
  changeOrg() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.ALL_USER_ORGANIZATION_LIST, MESSAGE.ORGANIZATIONS_PAGE, this.menu, CONFIRM_MESSAGES.ORGANZATION);
  }

  showLogoutConfirmation() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.LOGIN, MESSAGE.LOGOUT, this.menu, CONFIRM_MESSAGES.LOG_OUT);
  };

  async refreshInterval () {
    interval(CONSTANTS.performDeltaSync).subscribe(async ()=>{
      const promiseArray = await this.syncDataService.getSync(true);

      for(const {presenApi} of promiseArray) {
        try {
          const response = await presenApi;
          console.log(response, 'calling Delta Sync API')
          
        } catch (error) {
          console.error(error);
        }
      }
    })
  };
}
