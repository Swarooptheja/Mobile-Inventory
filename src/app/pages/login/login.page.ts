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
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage  {
  showPassword: boolean = false;
  account:any = {
    username: '',
    password: ''
  };
  constructor(
    private networkProvider: NetworkproviderService,
    private uiProvider: UiProviderService,
    private bodyParamsProvider: BodyParamsService,
    private loginService: LoginService,
    private globalvar: GlobalvariablesService,
    private storage: Storage,
    private navCtrl : NavController,
    private masterdataservice: MasterApiDataService
  ) {
   }


  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async login(isSSO = "N") {
    // For Testing:
    this.account.username = 'manideep j';
    this.account.password = 'manudj';
    if (this.networkProvider.isOnline()) {
      // If user attempt login without giving username
      if (this.account.username === "") {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_ENTER_USERNAME);
        return;
      };

      // If user attempt login without giving password
      if (this.account.password === "") {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_ENTER_PASSWORD);
        return;
      };

      this.uiProvider.getCustomLoader(MESSAGE.PLEASE_WAIT)
      let userdata = this.bodyParamsProvider.getLoginBodyParams(this.account.username.trim(), this.account.password.trim(), isSSO)
      let loginUrl = Appsettings.loginURL;

      this.loginService.getLoginData(userdata, loginUrl).subscribe(async (loginResponse: any) => {
        if (!loginResponse) {
          // TODO: try to use guard-clauses
          this.uiProvider.dismissLoader();
          this.uiProvider.showError(ERROR_MESSAGE.SERVER_ERROR);
          return;
        }
        const loginResult = loginResponse.data;
        const isValidLogin = loginResult && loginResult.length > 0 && loginResult[0].STATUS.toString() === '1';
        const isNotValidLogin = loginResult && loginResult.length > 0 && (loginResult[0].STATUS.toString() === '0' || loginResult[0].STATUS.toString() === '2')
        if (isValidLogin) {

          // TODO: can use 'find', if only first occurence is required;
          const orgId = loginResult.find((response: any) => response.DEFAULT_ORG_ID);

          const userId = loginResult.find((response: any) => response.USER_ID);

          const personId = loginResult.find((response: any) => response.PERSON_ID);

          if (userId) {
            this.globalvar.setUserId(userId.USER_ID)
          }
          if (personId) {
            this.globalvar.setPersonId(personId.PERSON_ID);
          } 
          if (!orgId) {
            this.uiProvider.dismissLoader();
            return;
          };
          this.globalvar.setOrgId(orgId.DEFAULT_ORG_ID);
          const isUserOrgId = !JSON.parse(this.globalvar.getAllUserOrganization())
          if (isUserOrgId) {
            await this.masterdataservice.getInventoryOrganizations(false)
          }
          this.globalvar.setUserDetails(loginResult);
          this.globalvar.setUserName(this.account.username)
          this.globalvar.setUsername(this.account.username)
          this.uiProvider.dismissLoader();

          if (isUserOrgId) {
            await this.uiProvider.showSuccess(MESSAGE.LOGIN_SUCCESS);
            await this.uiProvider.dismissSuccess()
            this.navCtrl.navigateForward(ROUTE_PATHS.ALL_USER_ORGANIZATION_LIST);
          } else {
            await this.uiProvider.showSuccess(MESSAGE.PLEASE_WAIT);
            await this.uiProvider.dismissSuccess();
            this.navCtrl.navigateForward(ROUTE_PATHS.ACTIVITY)
          }
        } else if (isNotValidLogin) {
          this.uiProvider.dismissLoader();
          this.uiProvider.showError(loginResult[0].ERROR);
        } else {
          this.uiProvider.dismissLoader();
          this.uiProvider.showError(ERROR_MESSAGE.PLEASE_CHECK_CREDENTIALS);
        }
      });

      return

    }
    console.log('User in Offline mode')
    this.uiProvider.showError(ERROR_MESSAGE.PLEASE_CHECK_YOUR_INTERNET_CONNECTION)
  }


}
