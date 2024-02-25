import { Component, OnInit } from '@angular/core';
import { Appsettings, ERROR_MESSAGE, MESSAGE, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { AlertsService } from 'src/app/providers/alerts/alerts.service';
import { BodyParamsService } from 'src/app/providers/body-params/body-params.service';
import { NetworkproviderService } from 'src/app/providers/network/networkprovider.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { LoginService } from './login.service';
import { GlobalvariablesService } from 'src/app/providers/globalvariables/globalvariables.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { MasterApiDataService } from 'src/app/providers/All-apis/master-api-data.service';
import {OfflineDataService} from 'src/app/providers/offline/offline-data.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  showPassword: boolean = false;
  account:any = {}
  savecredentials: any;
  savecred: boolean = false;
  constructor(
    private networkProvider: NetworkproviderService,
    private uiProvider: UiProviderService,
    private alertProvider:AlertsService,
    private bodyParamsProvider: BodyParamsService,
    private loginService: LoginService,
    private globalvar: GlobalvariablesService,
    private storage: Storage,
    private navCtrl : NavController,
    private masterdataservice: MasterApiDataService
  ) {
    this.account.username = '',
    this.account.password = ''
   }

  ngOnInit() {
  };
  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async login(isSSO = "N") {
    // For Testing:
     this.account.username = 'manideep j';
     this.account.password = 'manudj';

    if (this.savecredentials == null || this.savecredentials == undefined || this.savecredentials == false || this.savecredentials == "") {
			this.storage.set('savedUsername', "");
			this.storage.set('savedPassword', "");
		}
    if(this.networkProvider.isOnline()){
     if (this.account.username === "") {
      // this.uiProvider.dismissLoader();
      // this.alertProvider.usernameAlert().then((usernameAlert)=>{
      //   usernameAlert.present();
      // })
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_ENTER_USERNAME);
      return;
     };

     if(this.account.password === "" && isSSO ==="N") {
      // this.uiProvider.dismissLoader();
      // this.alertProvider.passwordAlert().then((passwordAlert)=>{
      //   passwordAlert.present();
      // });
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_ENTER_PASSWORD);
      return;
     };
     this.uiProvider.getCustomLoader(MESSAGE.PLEASE_WAIT)
     let userdata = this.bodyParamsProvider.getLoginBodyParams(this.account.username.trim(), this.account.password.trim(), isSSO)
     let loginUrl = Appsettings.loginURL;

     this.loginService.getLoginData(userdata, loginUrl, "Login").subscribe(async (loginResponse)=>{
      if(!loginResponse) {
       this.uiProvider.dismissLoader();
       this.uiProvider.showError(ERROR_MESSAGE.SERVER_ERROR);
        return;
      } else{
        let loginResult = loginResponse.data
        if (loginResult && loginResult.length > 0 && (loginResult[0].STATUS == '1' || loginResult[0].STATUS == 1)){
          let orgId = loginResult.filter((response:any)=>{
            return response.DEFAULT_ORG_ID !=="";
          })
          const userId = loginResult.filter((response:any)=>{
            return response.USER_ID !=='';
          })
          const personId = loginResult.filter((response:any)=>{
            return response.PERSON_ID !=='';
          });

          if(userId && userId.length > 0) {
            this.globalvar.setUserId(userId[0].USER_ID)
          }
          if(personId && personId.length > 0 ) {
            this.globalvar.setPersonId(personId[0].PERSON_ID);
          }
          
          if(orgId && orgId.length > 0){
            this.globalvar.setOrgId(orgId[0].DEFAULT_ORG_ID)
          } else{
            this.uiProvider.dismissLoader();
            return;
          }
          if (!JSON.parse(this.globalvar.getAllUserOrganization())) {
            await this.masterdataservice.getInventoryOrganizations(false)
          }
          this.storage.set('userDetails',loginResult);
          this.storage.set('username', this.account.username);
          this.storage.set('password', this.account.password);
          this.globalvar.setUsername(this.account.username)
          this.uiProvider.dismissLoader();
          if (this.savecred == true) {
            this.storage.set('savecredentials', true);
          } else {
            this.storage.set('savecredentials', false);
          }
          if (!JSON.parse(this.globalvar.getAllUserOrganization())) {
            this.storage.get('userDetails').then((userDetails) => {
              this.uiProvider.showSuccess(MESSAGE.LOGIN_SUCCESS);
              this.navCtrl.navigateForward(ROUTE_PATHS.ALL_USER_ORGANIZATION_LIST,{ queryParams: userDetails })
            });
          } else{

          }
        } else if (loginResult && loginResult.length > 0 && (loginResult[0].STATUS === '0' || loginResult[0].STATUS === '2')) {
          this.uiProvider.dismissLoader();
          this.uiProvider.showError(loginResult[0].ERROR);
        } else{
          this.uiProvider.dismissLoader();
          this.uiProvider.showError(ERROR_MESSAGE.PLEASE_CHECK_CREDENTIALS);
        }
      }
     })
      
    }
    else {
      console.log('User in Offline mode')
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
    } 
  }



}
