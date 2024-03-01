import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component'

import { IonicModule } from '@ionic/angular';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { SubInvLocatorComponent } from '../../sub-inv-locator/sub-inv-locator.component';
import { SerialNumberComponent } from '../../serial-number/serial-number.component';
import { SerialmodalComponent } from '../../serialmodal/serialmodal.component';
import { LotNumberComponent } from '../../lot-number/lot-number.component';
import { LotmodalComponent } from '../../lotmodal/lotmodal.component';
import { BarcodeScannerComponent } from '../../barcode-scanner/barcode-scanner.component';


@NgModule({
  declarations: [
   HeaderComponent,
   SearchBarComponent,
   SubInvLocatorComponent,
   SerialNumberComponent,
   SerialmodalComponent,
   LotNumberComponent,
   LotmodalComponent,
   BarcodeScannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    SearchBarComponent,
    SubInvLocatorComponent,
    SerialNumberComponent,
    SerialmodalComponent,
    LotNumberComponent,
    LotmodalComponent,
    BarcodeScannerComponent
  ]
})
export class SharedModule { }
