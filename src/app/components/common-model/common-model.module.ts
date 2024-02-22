import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonModelPageRoutingModule } from './common-model-routing.module';

import { CommonModelPage } from './common-model.page';
import { SharedModule } from '../sharedmodule/shared/shared.module';
import { FiltercustompipeModule } from '../Custompipes/filtercustompipe/filtercustompipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModelPageRoutingModule,
    SharedModule,
    FiltercustompipeModule
  ],
  declarations: [CommonModelPage]
})
export class CommonModelPageModule {}
