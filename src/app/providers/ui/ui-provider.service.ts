import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { LoadingController, ToastController, ModalController, AlertController, NavController } from '@ionic/angular';
import { Appsettings, MESSAGE } from 'src/app/constants/pages/App-settings';

@Injectable({
  providedIn: 'root'
})
export class UiProviderService {

  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private modelCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController
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
  dismissLoader(): void {
    const dismiss = this.loadingCtrl.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
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

  async showConfirmation(path:string, message:string, menu:any) {
    const alert = await this.alertCtrl.create({
      message: message,
      header: 'Log out',
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
        handler: () => {
          console.log('Alert confirmed');
          menu.close();
          this.navCtrl.navigateRoot(path)
        },
      },
      ]
    });
    alert.present();
  }

}
