import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ROUTE_PATHS } from 'src/app/constants/pages/App-settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  heading:string = 'Dashboard';
  isHome: boolean = false;
  isMenu: boolean = true;
  userDetails: any;
  goodsReceiptResp:boolean = true;
  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) {
    
   }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.storage.get('userDetails').then((userDetails)=>{
      this.userDetails = userDetails;
    })
    this.updateCounts();
  }

  updateCounts () {

  }

  goToGoodsReceipt() {
    this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE)
  }
  goToTransactionBatch () {

  }

}
