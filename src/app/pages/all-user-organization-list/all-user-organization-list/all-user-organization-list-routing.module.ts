import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllUserOrganizationListPage } from './all-user-organization-list.page';

const routes: Routes = [
  {
    path: '',
    component: AllUserOrganizationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllUserOrganizationListPageRoutingModule {}
