import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { GoodsReceiptDataService } from './goods-receipt-data.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-po-list.page.html',
  styleUrls: ['./goods-receipt-po-list.page.scss'],
})
export class GoodsReceiptPoListPage implements OnInit {
   heading:string = 'Goods Receipt List Page';
   isBack: boolean = true;
   searchText:any;
   goodsReceiptList:any = [];
  constructor(
    private navCtrl: NavController,
    private goodsReceiptDataService: GoodsReceiptDataService
  ) { }

  ngOnInit() {
  };

  ionViewDidLoad (): void {
    this.getReceiptPurchseOrderList();
  }
  
  async getReceiptPurchseOrderList () {
    try {
      this.goodsReceiptList = await this.goodsReceiptDataService.getReceiptPurchaseOrdersListFromDB();   
    } catch (error) {
      console.log(error);
    }     
  }

  goBackToPreviousPage (){
    this.navCtrl.navigateBack(ROUTE_PATHS.DASH_BOARD)
  }

  goToDetailsPage(value: any){

  }

  clearSerchItem () {
    this.searchText = ''
  }

  getsearchItems(event:any) {
    this.searchText = event.target.value;
  }

  onIonInfinite (event:any) {

  }


}
