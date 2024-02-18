import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private alertCtrl : AlertController
  ) { }

  passwordAlert() {
    const alert = this.alertCtrl.create({
      message: 'Please enter password',
      buttons:[{
        text:"Ok"
      }]
    })
    return alert
  }
  usernameAlert() {
    const alert = this.alertCtrl.create({
      message: 'Please enter Username',
      buttons:[{
        text:"Ok"
      }]
    })
    return alert
  }
  loginErrorAlert(message:any) {
    const alert = this.alertCtrl.create({
      message: 'message',
      buttons:[{
        text:"Ok"
      }]
    })
    return alert
  }

}
