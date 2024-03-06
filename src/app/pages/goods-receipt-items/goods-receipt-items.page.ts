
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ERROR_MESSAGE, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { ActivatedRoute } from '@angular/router';
import { GoodsReceiptDataService } from '../goods-receipt-po-list/goods-receipt-data.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { Header } from 'src/app/components/header/header';
@Component({
  selector: 'app-goods-receipt-items',
  templateUrl: './goods-receipt-items.page.html',
  styleUrls: ['./goods-receipt-items.page.scss'],
})
export class GoodsReceiptItemsPage implements OnInit {

  heading: string = Header.GOODS_RECEIPT_ITEMS_PAGE;
  isBack: boolean = true;
  searchText: string = '';
  selectedPurchaseOrder: any;
  receiptPurchaseOrderItems: any = [];
  scanText: string = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private goodsReceiptDataService: GoodsReceiptDataService,
    private uiProvider: UiProviderService
  ) {
    this.route.queryParams.subscribe((params: any) => {
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

  onPullRefresh(event: any) {
    this.getReceiptPurchaseOrderItems();
    setTimeout(() => {
      event.target.complete();
    }, 3000);

  };


  scanItemNumber(event: any) {
    try {
      const selectedPoLineItem = this.receiptPurchaseOrderItems.filter((item: any) => item.ItemNumber === event);
      if (!selectedPoLineItem.length) {
        this.uiProvider.showError(ERROR_MESSAGE.INVALID_ITEM_NUM);
        return;
      };
      // let selectedPoLineItem = this.receiptPurchaseOrderItems[index];
      this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_ITEM_DETAILS_PAGE, {
        queryParams: {
          selectedPoLineItem: selectedPoLineItem[0],
          // selectedIndex: index,
          // receiptPurchaseOrderItems: this.receiptPurchaseOrderItems
        }
      })
    } catch (error) {
      console.error(error);

    }
  }

  async getReceiptPurchaseOrderItems() {
    try {
      const purchseOrderItems = await this.goodsReceiptDataService.getReceiptPurchaseOrdersItemsFromDB(this.selectedPurchaseOrder.PoHeaderId, this.selectedPurchaseOrder.PoReleaseId, this.selectedPurchaseOrder.ShipmentHeaderId, this.selectedPurchaseOrder.RMANumber)
      this.receiptPurchaseOrderItems = purchseOrderItems;
      console.log(this.receiptPurchaseOrderItems, "receipt purchaseorderitems")
    } catch (error) {
      console.error(error);
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


  goToGoodsReceiptItemDetails(receiptPurchseOrderItem: any, index: number) {
    let selectedPoLineItem = this.receiptPurchaseOrderItems[index];
    this.navCtrl.navigateForward(ROUTE_PATHS.GOODS_RECEIPT_ITEM_DETAILS_PAGE, {
      queryParams: {
        selectedPoLineItem, selectedIndex: index,
        receiptPurchaseOrderItems: this.receiptPurchaseOrderItems
      }
    });
  }


}
