
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { ActivatedRoute } from '@angular/router';
import { GoodsReceiptDataService } from '../goods-receipt-po-list/goods-receipt-data.service';

@Component({
  selector: 'app-goods-receipt-items',
  templateUrl: './goods-receipt-items.page.html',
  styleUrls: ['./goods-receipt-items.page.scss'],
})
export class GoodsReceiptItemsPage implements OnInit {

  heading: string = 'Goods Receipt Items Page';
  isBack: boolean = true;
  searchText: string = '';
  selectedPurchaseOrder: any;
  receiptPurchaseOrderItems:any =[];
  showSearchBar:boolean = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private goodsReceiptDataService: GoodsReceiptDataService
  ) {
    this.route.queryParams.subscribe((params:any)=>{
      this.selectedPurchaseOrder = params;
    });
  }
  
  ngOnInit() {
    this.getReceiptPurchaseOrderItems();
  }

  ionViewWillEnter(): void {
    console.log(this.selectedPurchaseOrder, 'ionviewenter');
    this.getReceiptPurchaseOrderItems();
  }

  async getReceiptPurchaseOrderItems() {
    try {
      const purchseOrderItems = await this.goodsReceiptDataService.getReceiptPurchaseOrdersItemsFromDB(this.selectedPurchaseOrder.PoHeaderId, this.selectedPurchaseOrder.PoReleaseId, this.selectedPurchaseOrder.ShipmentHeaderId, this.selectedPurchaseOrder.RMANumber)
      this.receiptPurchaseOrderItems = purchseOrderItems;
      console.log(this.receiptPurchaseOrderItems,"receipt purchaseorderitems")
    } catch (error) {
      console.log(error);
    }
  }
  goBackToPreviousPage() {
    this.navCtrl.navigateBack(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE);
  }

  clearSearchItem() {
    this.searchText = ''
  };

  getsearchItems(event: any) {
    this.searchText = event.target.value;
  }

  toggleSearch() {
    this.showSearchBar = true;
  }

  goToGoodsReceiptItemDetails(receiptPurchseOrderItem:any, index:number) {
    let selectedPoLineItem = this.receiptPurchaseOrderItems[index];
    this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_ITEM_DETAILS_PAGE, {queryParams:{selectedPoLineItem,selectedIndex:index,
		receiptPurchaseOrderItems: this.receiptPurchaseOrderItems
    }});
  }


}
