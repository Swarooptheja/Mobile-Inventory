import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { OfflineDataService } from './providers/offline/offline-data.service';
import { NavController,IonMenu, AlertController } from '@ionic/angular';
import { UiProviderService } from './providers/ui/ui-provider.service';
import { MESSAGE, ROUTE_PATHS } from './constants/pages/App-settings';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username: string = '';
  inventoryOrgCode: string = ''
  @ViewChild('mainMenu')menu!:IonMenu
  constructor(
    private storage: Storage,
    private offlineDataService: OfflineDataService,
    private navCtrl: NavController,
    private uiProvider: UiProviderService,
    private alertCtrl: AlertController
  ) {

  }
  async ngOnInit() {
    await this.storage.create();
  }
  ionViewWillEnter() {
    this.storage.get('username').then((username) => {
      this.username = username;
    });
    this.storage.get('inventoryOrgCode').then((orgCode) => {
      this.inventoryOrgCode = orgCode;
    })
  }
  changeOrg() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.ALL_USER_ORGANIZATION_LIST, MESSAGE.ORGANIZATIONS_PAGE, this.menu);
  }

  showLogoutConfirmation() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.LOGIN, MESSAGE.LOGOUT, this.menu);
  };
}
