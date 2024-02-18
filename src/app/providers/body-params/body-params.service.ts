import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BodyParamsService {

  constructor() { }

  //login method
  getLoginBodyParams(username: string, password: string, isSSO: string) {
    return {
      username: username,
      password: password,
      isSSO: isSSO || "N"
    };
  }

  getHeaders(body: any) {
    return ({
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Language': 'en-US',
        'Authorization': 'Basic c3lzYWRtaW46U3F1ZWV6ZUAzMjE='
      }
    })
  }
}
