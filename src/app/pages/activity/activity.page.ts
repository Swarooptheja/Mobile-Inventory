import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, IonContent } from '@ionic/angular';
import { API_CALLS_MESSAGES, CONFIRM_MESSAGES, MESSAGE, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { MasterApiDataService } from 'src/app/providers/All-apis/master-api-data.service';
import { SyncDataService } from 'src/app/providers/All-apis/sync-data.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage {
  heading: string = 'Activity Page';
  isDeltaSync: boolean = true;
  resultArray: any[] = [];
  loadingCard: any;
  isBack: boolean = false;
  isLogOut: boolean = true
  displaySyncAgain: boolean = false
  @ViewChild('ionContent', { static: false })
  ionContent!: IonContent;
  constructor(
    private navCtrl: NavController,
    private syncDataService: SyncDataService,
    private uiProvider: UiProviderService
  ) {

  }
  ionViewDidEnter() {
    this.syncAllAPIs()
  }

  logOut() {
    this.uiProvider.showConfirmation(ROUTE_PATHS.LOGIN,MESSAGE.LOGOUT, '', CONFIRM_MESSAGES.LOG_OUT);
  };

  async syncAllAPIs() {
    const promiseArray = await this.syncDataService.sync(false);
    let navigate = true;
    for (const { presentApi, apimessage } of promiseArray) {
      try {
        this.loadingCard = await this.presentLoadingCard(apimessage);
        await this.updateLoadingCard(this.loadingCard, 'loading', `${apimessage} fetching`);
        const response = await presentApi;
        if (!response && !(apimessage === API_CALLS_MESSAGES.lot || apimessage === API_CALLS_MESSAGES.serials)) {
          throw new Error('API call failed')
        }
        await this.updateLoadingCard(this.loadingCard, 'checkmark-circle', `${apimessage} fetched & Saved`);

      } catch (error: any) {
        this.updateLoadingCard(this.loadingCard, 'close-circle', `${apimessage} failed fetching`);
        console.error('API call failed', error);
        navigate = false;
      }
    }
    if(navigate) {
      this.navCtrl.navigateForward(ROUTE_PATHS.DASHBOARD);
      return;
    } 
      this.displaySyncAgain = true;
  }
  async presentLoadingCard(message: any) {
    const loading = await this.uiProvider.loadingCard(message);
    const loadingCard = {
      loading,
      status: 'loading',
      message,
      translucent: true,
      cssClass: 'slide-in-from-right',
    };

    this.resultArray.push(loadingCard);
    return loadingCard;
  }
  async updateLoadingCard(card: any, status: string, message: string) {
    card.status = status;
    card.message = message;
    card.loading.dismiss();
    await this.ionContent.scrollToBottom();
  }

  syncAgain () {
    this.displaySyncAgain = false;
    this.syncAllAPIs();
  }
}
