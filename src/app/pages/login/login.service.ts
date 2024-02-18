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

  getLoginData(userdata: any, url: any, servicename: string) {
    try {
      console.log(url, "url");
      let body = JSON.stringify(userdata);
  
      console.warn({
        url,
        userdata
      });
  
      return this.httpclient.request('POST', url, { 'body': body, 'headers': { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Content-Language': 'en-US', 'Authorization': 'Basic c3lzYWRtaW46U3F1ZWV6ZUAzMjE=' } }).pipe(
        timeout(2*60*1000),
        tap((data: any) => {
          console.log(data, 'data');
        }),
        catchError((error) => {
          this.uiProvider.showError('we are unable to load data in login');
          console.log(error);
          return throwError(error);
        })
      );
    } catch (error) {
      this.uiProvider.showError('An unexpected error occurred');
      console.log(error);
      return throwError(error);
    }
  }
}
