import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ERROR_MESSAGE, MESSAGE, POST_TRANSACTION_DESTINATIONS, RESPONSIBILITIES, RESPONSIBILITY, ROUTE_PATHS, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { GoodsReceiptDataService } from '../goods-receipt-po-list/goods-receipt-data.service';
import { NetworkproviderService } from 'src/app/providers/network/networkprovider.service';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';
import { firstValueFrom } from 'rxjs';
import { SyncDataService } from 'src/app/providers/All-apis/sync-data.service';

interface ApiData<T> {
  [key: string]: T
};

interface localApiData extends ApiData<any> {
  QTY?: number;
};
@Component({
  selector: 'app-goods-receipt-item-details',
  templateUrl: './goods-receipt-item-details.page.html',
  styleUrls: ['./goods-receipt-item-details.page.scss'],
})
export class GoodsReceiptItemDetailsPage {
  heading: string = 'Item Details Page'
  isBack: boolean = true;
  poSubItemDetails: any;
  index: number = 0;
  receiptPurchaseOrderItems: any = [];
  itemNumber: any;
  destination: any;
  swiperModules = [IonicSlides];
  locator: any;
  subInventory: any;
  serials: any;
  lots: any;
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isSubinvLocEnable: boolean = true;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private uiProvider: UiProviderService,
    private goodReceiptService: GoodsReceiptDataService,
    private networkService: NetworkproviderService,
    private offlineDataService: OfflineDataService,
    private syncDataService: SyncDataService

  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.poSubItemDetails = params?.selectedPoLineItem;
      this.index = params?.selectedIndex,
        // this.receiptPurchaseOrderItems = params.receiptPurchaseOrderItems,
        this.getpurchaseOrderItem()
    })
  }

  getpurchaseOrderItem() {
    this.receiptPurchaseOrderItems.push(this.poSubItemDetails);
    this.itemNumber = this.poSubItemDetails.ItemNumber;
    this.destination = this.poSubItemDetails.DestinationType;
  }


  goBackToPreviousPage() {
    this.navCtrl.back();
  }

  onSlideChange() {
    if (this.swiperRef?.nativeElement.swiper.activeIndex >= this.receiptPurchaseOrderItems.length) {
      return;
    };
    this.index = this.swiperRef?.nativeElement.swiper.activeIndex;
    console.log(this.index, "index")
    this.destination = this.receiptPurchaseOrderItems[this.index].DestinationType;
    console.log(this.destination, 'destination')
    this.itemNumber = this.receiptPurchaseOrderItems[this.index].ItemNumber;
  };

  goToKeypad(event: any, index: number) {
    if (event) {
      this.checkQuantityValidation(event?.detail?.value, index);
    }
  }

  checkQuantityValidation(quantityReceived: string, index: number) {
    const currentPurchaseOrderItem: any = this.receiptPurchaseOrderItems[index];
    let quantityRemaining: number = Number(currentPurchaseOrderItem.QtyRemaining);

    if (quantityRemaining < Number(quantityReceived)) {
      this.receiptPurchaseOrderItems[index].QTY = ''
      this.uiProvider.showError(ERROR_MESSAGE.LESS_QUANTITY);
      return;
    }
    this.receiptPurchaseOrderItems[index].QTY = quantityReceived;
  }

  onChange(event: any) {
    console.log(event, 'event')
  }

  isSubInvLocValid(purchaseOrderItem: any): boolean {
    return purchaseOrderItem && purchaseOrderItem.ItemNumber
  }

  isSerialControlled(purchaseOrderItem: any): boolean {
    return purchaseOrderItem.IsSerialControlled.toLowerCase() === 'true';
  }

  isLotControlled(purchaseOrderItem: any): boolean {
    return purchaseOrderItem.IsLotControlled.toLowerCase() === 'true';
  }

  onSelectLocator(event: any) {
    this.locator = event.locator
  }
  onSelectSubInventory(event: any) {
    this.subInventory = event.subInventory;
  }

  onSelectSerials(event: any) {
    this.serials = event.selectedSerials;
  }

  onSelectLots(event: any) {
    this.lots = event.selectedLots;
  }

  async performPostTransaction(purchaseOrderItem: any, index: any) {
    try {
      if (!this.checkAllValidations(purchaseOrderItem)) {
        return;
      };

      this.uiProvider.getCustomLoader(MESSAGE.PLEASE_WAIT);

      const currentPurchaseOrderItem = {
        ...purchaseOrderItem,
        selectedLot: this.lots,
        selectedSerials: this.serials,
        selectedSubInventory: this.subInventory,
        selectedLocator: this.locator
      };
      // const payload = await this.goodReceiptService.goodsReceiptPayload([currentPurchaseOrderItem]);

      const transaction = this.goodReceiptService.saveTransactionHistory(currentPurchaseOrderItem, RESPONSIBILITY.GOODS_RECEIPTS);

      await this.offlineDataService.insertDataIntoTable([transaction], TABLE_NAME.TRANSCTION_TABLE_RECEIPT);

      purchaseOrderItem.QtyRemaining = parseInt(purchaseOrderItem.QTY, 10)
        ? (purchaseOrderItem.QtyRemaining - parseInt(purchaseOrderItem.QTY, 10))
        : purchaseOrderItem.QtyRemaining;

      if (this.networkService.isOnline()) {
        const response = await this.goodReceiptService.postGoodsReceiptTransaction();
        const result = await Promise.all(response);
        result.forEach(async (res: any) => {
          if (res.result === 'Success') {
            this.uiProvider.dismissLoader();
            this.uiProvider.showSuccess(MESSAGE.TRANSACTION_SUCCESS);
            await this.goodReceiptService.performDeltaSyncOperation();
            this.uiProvider.dismissSuccess();
            this.navCtrl.navigateRoot(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE)
            return;
          } else if (res.result === 'Error') {
            this.uiProvider.dismissLoader();
            this.uiProvider.showError(MESSAGE.TRANSACTION_FAILED);
            await this.uiProvider.dismissSuccess();
            this.navCtrl.navigateRoot(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE);
            return;
          } else {
            this.uiProvider.dismissLoader();
            this.uiProvider.showError(MESSAGE.TRANSACTION_FAILED);
          }

        })
        // const response: any = await firstValueFrom(this.goodReceiptService.performPostOperation(payload));

        // if (response && response['Response']) {
        //   transaction.status = response['Response'][0].RecordStatus;
        //   transaction.receiptInfo = response['Response'][0].ReceiptNumber;
        //   transaction.error = response['Response'][0].Message
        // };
        // Insert Transaction Data into table        

        // this.uiProvider.dismissLoader();
        // if (response && response['Response']) {
        //   if (response['Response'][0].RecordStatus === 'S') {
        //     await this.uiProvider.showSuccess(MESSAGE.TRANSACTION_SUCCESS);
        //     const promiseArray = await this.syncDataService.sync(true);

        //     for (const { presenApi } of promiseArray) {
        //       const response = await presenApi;
        //       console.log(response, 'calling Delta Sync API')
        //     };
        //   this.uiProvider.dismissSuccess();
        //   this.navCtrl.navigateRoot(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE)
        //   return;
      }
      //  await this.uiProvider.showError(MESSAGE.TRANSACTION_FAILED);
      //  await this.uiProvider.dismissSuccess();
      //  this.navCtrl.navigateRoot(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE);

      //   return;
      // }
      // return;
      // };
      await this.uiProvider.dismissLoader();
      this.uiProvider.showSuccess(MESSAGE.SAVED_GOODS_RECEIPT_DATA_LOCALLY);
      // await this.offlineDataService.insertDataIntoTable([transaction], TABLE_NAME.TRANSCTION_TABLE_RECEIPT);
      await this.uiProvider.dismissSuccess();
      this.navCtrl.navigateRoot(ROUTE_PATHS.GOODS_RECEIPT_PO_LIST_PAGE);

    } catch (error) {
      console.log(error);
    }

  }

  checkAllValidations(purchaseOrderItem: any): boolean {
    if (!purchaseOrderItem.QTY) {
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_QTY);
      return false
    }
    if (this.destination === POST_TRANSACTION_DESTINATIONS.INVENTORY) {
      if (!this.subInventory) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV)
        return false;
      };
      if (!this.locator) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_LOCATOR);
        return false;
      };
      if (this.isSerialControlled(purchaseOrderItem) && !this.serials) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SERIALS);
        return false;
      };
      if (this.isLotControlled(purchaseOrderItem) && !this.lots) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_LOTS);
        return false;
      }

      return true;
    }
    return true
  }

}
