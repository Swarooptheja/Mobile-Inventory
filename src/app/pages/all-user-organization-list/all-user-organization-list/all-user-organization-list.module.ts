import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllUserOrganizationListPageRoutingModule } from './all-user-organization-list-routing.module';

import { AllUserOrganizationListPage } from './all-user-organization-list.page';
// import { SharedModule } from 'src/app/components/sharedmodule/sharedmodule/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SharedModule } from 'src/app/components/sharedmodule/shared/shared.module';
import { NgPipesModule } from 'ngx-pipes';
import { FiltercustompipeModule } from 'src/app/components/Custompipes/filtercustompipe/filtercustompipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllUserOrganizationListPageRoutingModule,
    SharedModule,
    NgPipesModule,
    FiltercustompipeModule
  ],
  declarations: [AllUserOrganizationListPage]
})
export class AllUserOrganizationListPageModule {}
