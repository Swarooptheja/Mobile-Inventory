import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, IonContent } from '@ionic/angular';
import { API_CALLS_MESSAGES } from 'src/app/constants/pages/App-settings';
import { MasterApiDataService } from 'src/app/providers/All-apis/master-api-data.service';
import { SyncDataService } from 'src/app/providers/All-apis/sync-data.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  heading: string = 'Activity Page';
  isDeltaSync: boolean = true;
  resultArray: any[] = [];
  loadingCard: any;
  isBack: boolean = true;
  displaySyncAgain: boolean = false
  @ViewChild('ionContent', { static: false })
  ionContent!: IonContent;
  constructor(
    private navCtrl: NavController,
    private syncDataService: SyncDataService,
    private masterDataService: MasterApiDataService,
    private loadingController: LoadingController,
    private uiProvider: UiProviderService
  ) {

  }
  ionViewDidEnter() {
    this.getSyncAllAPIs()
  }
  ngOnInit() {
  }
  goBackToPreviousPage() {
    this.navCtrl.navigateBack('all-user-organization-list')
  };

  async getSyncAllAPIs() {
    const promiseArray = await this.syncDataService.getSync(false);
    console.log("promiseArray", promiseArray);
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
      this.navCtrl.navigateForward('dashboard')
    } else {
      this.displaySyncAgain = true;
    }
  }
  async presentLoadingCard(message: any) {
    const loading = await this.uiProvider.loadingCard(message);
    const loadingCard = {
      loading,
      status: 'loading',
      message: `${message}`,
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
    this.getSyncAllAPIs();
  }
}
