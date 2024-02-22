import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { OfflineDataService } from './providers/offline/offline-data.service';
import { NavController,IonMenu, AlertController } from '@ionic/angular';
import { UiProviderService } from './providers/ui/ui-provider.service';
import { MESSAGE, ROUTE_PATHS } from './constants/pages/App-settings';
import { register } from 'swiper/element/bundle';
import { GlobalvariablesService } from './providers/globalvariables/globalvariables.service';

register();
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
    private alertCtrl: AlertController,
    private glovar: GlobalvariablesService
  ) {
    
  }
  async ngOnInit() {
    await this.storage.create();
  }

  ngOnchages () {
    this.username = this.glovar.getUsername()
    this.inventoryOrgCode = this.glovar.getOrganisationname();
  }
  ionViewWillEnter() {
   this.username = this.glovar.getUsername()
   this.inventoryOrgCode = this.glovar.getOrganisationname();
  };
  ionViewDidEnter() {
    this.username = this.glovar.getUsername()
    this.inventoryOrgCode = this.glovar.getOrganisationname();
  }
  changeOrg() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.ALL_USER_ORGANIZATION_LIST, MESSAGE.ORGANIZATIONS_PAGE, this.menu);
  }

  showLogoutConfirmation() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.LOGIN, MESSAGE.LOGOUT, this.menu);
  };
}
