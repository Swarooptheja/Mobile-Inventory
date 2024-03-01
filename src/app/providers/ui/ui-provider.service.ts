import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Appsettings, MESSAGE, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from '../offline/offline-data.service';

@Injectable({
  providedIn: 'root'
})
export class UiProviderService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private modelCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private OfflineDataService: OfflineDataService
  ) { }

  async showError(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      position: 'top',
      color: 'danger',
      duration: 3000,
      buttons: ['Close']

    });
    await toast.present()

  };

  // Success toast message

  async showSuccess(successMessage: string) {
    const toast = await this.toastController.create({
      message: successMessage,
      position: 'top',
      color: 'success',
      duration: 3000,
      buttons: ['Close']

    });
    await toast.present()
  }

  async dismissSuccess () {
     await this.toastController.dismiss()
  }

  // Create Loader

  getCustomLoader(message: string) {
    const loader = this.loadingCtrl.create({
      spinner: 'circles',
      message: message,
      showBackdrop: true,
      duration: 3000,
      translucent: true
    });
    loader.then((loaderResponse) => {
      loaderResponse.present();
    });
  };

  // Dismiss loader
  async dismissLoader() {
    await this.loadingCtrl.dismiss()
  }
  async showAlert(message: any, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  loadingCard(message: any) {
    const loader = this.loadingCtrl.create({
      message: MESSAGE.DATA_LOADING
    });

    return loader;
  }

  async showConfirmation(path:string, message:string, menu:any, header: any) {
    const alert = await this.alertCtrl.create({
      message: message,
      header: header,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('alert dismissed')
        }
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: async () => {
          console.log('Alert confirmed');
          if(menu) {
            menu.close();
            if(ROUTE_PATHS.LOGIN === path) {
              await this.OfflineDataService.deleteSqlLiteDB();
            };
            this.navCtrl.navigateRoot(path)
          } else {
            await this.OfflineDataService.deleteSqlLiteDB();
            this.navCtrl.navigateRoot(path);
          }
        },
      },
      ]
    });
    alert.present();
  };

  async showDeleteConfirm () {
    const alert = await this.alertCtrl.create({
      message: 'Are you sure want to delete',
      header: 'TransactionHistory',
      buttons:[{
        text:'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('alert dismissed')
        }
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
          
        },
      },
    ]
    });

    return alert
  }

}
