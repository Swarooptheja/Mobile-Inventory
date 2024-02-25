import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ERROR_MESSAGE, MESSAGE, POST_TRANSACTION_DESTINATIONS, ROUTE_PATHS, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { GoodsReceiptDataService } from '../goods-receipt-po-list/goods-receipt-data.service';
import { NetworkproviderService } from 'src/app/providers/network/networkprovider.service';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-goods-receipt-item-details',
  templateUrl: './goods-receipt-item-details.page.html',
  styleUrls: ['./goods-receipt-item-details.page.scss'],
})
export class GoodsReceiptItemDetailsPage implements OnInit {
  heading: string = 'Item Details Page'
  isBack: boolean = true;
  poSubItemDetails:any;
  index:any;
  receiptPurchaseOrderItems:any = [];
  itemNumber: any;
  destination: any;
  swiperModules = [IonicSlides];
  locator:any;
  subInventory: any;
  serials:any;
  lots:any;
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isSubinvLocEnable:boolean = true;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private uiProvider: UiProviderService,
    private goodReceiptService: GoodsReceiptDataService,
    private networkService: NetworkproviderService,
    private offlineDataService: OfflineDataService

  ) {
    this.route.queryParams.subscribe((params:any)=>{
      this.poSubItemDetails = params.selectedPoLineItem;
      this.index = params.selectedIndex,
      // this.receiptPurchaseOrderItems = params.receiptPurchaseOrderItems,
      this.getpurchaseOrderItem()
    })
  }
  
  getpurchaseOrderItem () {
    this.receiptPurchaseOrderItems.push(this.poSubItemDetails);
    this.itemNumber = this.poSubItemDetails.ItemNumber;
    this.destination = this.poSubItemDetails.DestinationType;
  }
  
  ngOnInit() {
    console.log(this.destination,'thejaswaroop')
    console.log(this.receiptPurchaseOrderItems,'receiptpurchaseorderitem')
    console.log(this.poSubItemDetails, 'poSubItemDetails')
  }

  goBackToPreviousPage() {
    console.log('theja')
    this.navCtrl.back();
  }

  onSlideChange () {
    if(this.swiperRef?.nativeElement.swiper.activeIndex >= this.receiptPurchaseOrderItems.length) {
      return;
    };
    this.index = this.swiperRef?.nativeElement.swiper.activeIndex;
    console.log(this.index,"index")
    this.destination = this.receiptPurchaseOrderItems[this.index].DestinationType;
    console.log(this.destination,'destination')
		this.itemNumber = this.receiptPurchaseOrderItems[this.index].ItemNumber;
  };

  goToKeypad (event:any, index: number) {
    if(event){
			this.checkQuantityValidation(event?.detail?.value, index);
		}
  }

   checkQuantityValidation(quantityReceived: string, index:number) {
		const currentPurchaseOrderItem: any = this.receiptPurchaseOrderItems[index];
		let quantityRemaining: number = Number(currentPurchaseOrderItem.QtyRemaining);

    if (quantityRemaining < Number(quantityReceived)) {
      this.receiptPurchaseOrderItems[index].QTY = ''
      this.uiProvider.showError(ERROR_MESSAGE.LESS_QUANTITY);
      return;
    } 
      this.receiptPurchaseOrderItems[index].QTY = quantityReceived;
	}

  onChange (event:any) {
    console.log(event, 'event')
  }

  isSubInvLocValid (purchaseOrderItem:any):boolean {
    return purchaseOrderItem && purchaseOrderItem.ItemNumber
  }

  isSerialControlled(purchaseOrderItem:any):boolean {
    return purchaseOrderItem.IsSerialControlled.toLowerCase() === 'true'? true : false
  }
  
  isLotControlled (purchaseOrderItem: any):boolean {
    return purchaseOrderItem.IsLotControlled.toLowerCase() === 'true'? true : false
  }

  onSelectLocator (event: any) {
    this.locator = event.locator
    console.log(event, 'parantlocator')
  }
  onSelectSubInventory (event: any) {
    this.subInventory = event.subInventory;
    console.log(event, 'parentsubinventory')
  }

  onSelectSerials (event:any) {
    this.serials = event.selectedSerials
    console.log(event, 'parent serials')
  }
  
  onSelectLots (event:any) {
    this.lots = event.selectedLots
    console.log(event, 'parentlots')
  }

  async performPostTransaction (purchaseOrderItem:any, index:any) {
    try {
      if (!this.checkAllValidations (purchaseOrderItem)) {
        return;
      }
      
      const currentPurchaseOrderItem = {
        ...purchaseOrderItem,
        selectedLot: this.lots,
        selectedSerials: this.serials,
        selectedSubInventory: this.subInventory,
        selectedLocator: this.locator
      };
      const payload = await this.goodReceiptService.goodsReceiptPayload(currentPurchaseOrderItem);

      const transaction = this.goodReceiptService.saveTransactionHistory(currentPurchaseOrderItem);

      if(this.networkService.isOnline()) {
        const response: any  = await firstValueFrom(this.goodReceiptService.performPostOperation(payload));
          if(response  && response['Response']) {
            transaction.status = response['Response'][0].RecordStatus;
            transaction.receiptInfo = response['Response'][0].ReceiptNumber;
            transaction.error = response['Response'][0].Message
          };
          // Insert Transaction Data into table        
        this.offlineDataService.insertDataIntoTable([transaction], TABLE_NAME.TRANSCTION_TABLE_RECEIPT);

        if(response && response ['Response']) {
          if(response['Response'][0].RecordStatus === 'S') {
            this.uiProvider.showSuccess(MESSAGE.TRANSACTION_SUCCESS);
            return;
          }
          this.uiProvider.showError(MESSAGE.TRANSACTION_FAILED);
          return;
        }
        return;
      };

      this.offlineDataService.insertDataIntoTable([transaction], TABLE_NAME.TRANSCTION_TABLE_RECEIPT)




      
      
    } catch (error) {
      console.log(error);
    }

  
    

  }

  checkAllValidations(purchaseOrderItem:any):any {
    if(!purchaseOrderItem.QTY) {
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_QTY);
      return false
    }
    if(this.destination === POST_TRANSACTION_DESTINATIONS.INVENTORY) {
      if (!this.subInventory) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV)
        return false;
      };
      if(!this.locator) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_LOCATOR);
        return false;
      };
      if(this.isSerialControlled(purchaseOrderItem) && !this.serials) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SERIALS);
        return false;
      };
      if(this.isLotControlled(purchaseOrderItem) && !this.lots) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_LOTS);
        return false;
      }

      return true;
    }
    return true
  }
    // Build payload here 



}
