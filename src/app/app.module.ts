import { NgModule } from '@angular/core';
import {NgPipesModule} from 'ngx-pipes';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as cordovasqlitedriver from 'localforage-cordovasqlitedriver';
import {Drivers} from '@ionic/storage'
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(
    {
      name:'mydb',
      driverOrder:[
        cordovasqlitedriver._driver,
        Drivers.IndexedDB, Drivers.LocalStorage
      ]
    }
  ), NgPipesModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClient,SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
