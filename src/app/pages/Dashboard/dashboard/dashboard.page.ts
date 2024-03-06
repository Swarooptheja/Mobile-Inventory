import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Header } from 'src/app/components/header/header';
import { QUERIES, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  heading: string = Header.DASH_BOARD;
  isHome: boolean = false;
  isMenu: boolean = true;
  userDetails: any;
  goodsReceiptResp: boolean = true;
  goodReceipt = {
    openCount: 0,
    completedCount: 0,
    progress: 0
  }
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private offlineDataService: OfflineDataService
  ) {

  }

  ionViewWillEnter() {
    this.loadGoodReceiptCount();
  }

  async loadGoodReceiptCount() {
    const allGoodsReceiptData = await this.offlineDataService.executeQueryWithoutParams(QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDERS_LIST);
    this.goodReceipt.openCount = allGoodsReceiptData.length;
  }

  goToGoodsReceipt() {
    this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE);
  }
  goToTransactionHistoryPage() {
    this.navCtrl.navigateForward(ROUTE_PATHS.TRANSACTION_HISTORY);
  }

}
