import { Injectable } from '@angular/core';
import { BodyParamsService } from 'src/app/providers/body-params/body-params.service';
import { HttpClient } from '@angular/common/http';
import { tap, throwError, timeout, catchError } from 'rxjs';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private bodyParams: BodyParamsService,
    private httpclient: HttpClient,
    private uiProvider: UiProviderService
  ) { }

  getLoginData(userdata: any, url: any): any {
    try {
      let body = JSON.stringify(userdata);
      const header = this.bodyParams.getHeaders();
      return this.httpclient.request('POST', url, { 'body': body, 'headers': header}).pipe(
        timeout(2*60*1000)
      );
    } catch (error) {
      this.uiProvider.showError('An unexpected error occurred');
      console.error(error);
     
    }
  }
}
