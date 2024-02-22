import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component'

import { IonicModule } from '@ionic/angular';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { SubInvLocatorComponent } from '../../sub-inv-locator/sub-inv-locator.component';


@NgModule({
  declarations: [
   HeaderComponent,
   SearchBarComponent,
   SubInvLocatorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    SearchBarComponent,
    SubInvLocatorComponent
  ]
})
export class SharedModule { }
