import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component'

import { IonicModule } from '@ionic/angular';
import { SearchBarComponent } from '../../search-bar/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   HeaderComponent,
   SearchBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    SearchBarComponent,
  ]
})
export class SharedModule { }
