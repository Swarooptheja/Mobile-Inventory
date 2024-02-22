import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModelPage } from './common-model.page';

const routes: Routes = [
  {
    path: '',
    component: CommonModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonModelPageRoutingModule {}
