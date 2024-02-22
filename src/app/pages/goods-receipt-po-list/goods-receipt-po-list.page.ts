import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CONSTANTS, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
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
   page:number = 1;
   isEnableInfiniteScroll: boolean = true;
  constructor(
    private navCtrl: NavController,
    private goodsReceiptDataService: GoodsReceiptDataService
  ) { 
    this.getReceiptPurchseOrderList();

  }

  ngOnInit() {
  };

  // ionViewDidLoad (): void {
  //   this.getReceiptPurchseOrderList();
  // }
  
  async getReceiptPurchseOrderList() {
    try {
      const response = await this.goodsReceiptDataService.getReceiptPurchaseOrdersListFromDB(this.searchText, this.page);
      if (!response || !response.length || response.length < CONSTANTS.queryLimitSize) {
        this.isEnableInfiniteScroll = false;
        console.log('Infinite Scroll has Closed');
      };
      this.goodsReceiptList = [...this.goodsReceiptList, ...response];
    } catch (error) {
      console.log(error);
    }     
  }

  goBackToPreviousPage (){
    this.navCtrl.navigateBack(ROUTE_PATHS.DASH_BOARD);
  }

  goToGoodsItemsPage(selectPurchaseOrder: any){
    this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_ITEMS_PAGE, {queryParams:selectPurchaseOrder});
  }

  clearSearchItem () {
    this.searchText = '';
    this.reInitializeInfiniteScroll();
  }

  getsearchItems(event:any) {
    this.searchText = event.target.value;
    this.reInitializeInfiniteScroll();
  }

 

  reInitializeInfiniteScroll() {
		console.log('Infinite Scroll has reinitialized');
		this.page = 1;
		this.goodsReceiptList = [];
		this.isEnableInfiniteScroll = true;
		this.getReceiptPurchseOrderList();
	};

  onIonInfinite(event:any) {
		console.log('Infinite Scroll has started');
		this.page = this.page + 1;
		this.getReceiptPurchseOrderList();
		setTimeout(() => {
			(event as InfiniteScrollCustomEvent).target.complete();
			console.log('Infinite Scroll has ended');
		}, 500);
	}


}
