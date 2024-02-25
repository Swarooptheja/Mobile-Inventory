import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'all-user-organization-list',
    loadChildren: () => import('./pages/all-user-organization-list/all-user-organization-list/all-user-organization-list.module').then( m => m.AllUserOrganizationListPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./pages/activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/Dashboard/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'goods-receipt-po-list',
    loadChildren: () => import('./pages/goods-receipt-po-list/goods-receipt-po-list.module').then( m => m.GoodsReceiptPoListPageModule)
  },
  {
    path: 'goods-receipt-items',
    loadChildren: () => import('./pages/goods-receipt-items/goods-receipt-items.module').then( m => m.GoodsReceiptItemsPageModule)
  },
  {
    path: 'goods-receipt-item-details',
    loadChildren: () => import('./pages/goods-receipt-item-details/goods-receipt-item-details.module').then( m => m.GoodsReceiptItemDetailsPageModule)
  },
  {
    path: 'common-model',
    loadChildren: () => import('./components/common-model/common-model.module').then( m => m.CommonModelPageModule)
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./pages/transaction-history/transaction-history.module').then( m => m.TransactionHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
