import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ERROR_MESSAGE, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

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
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isSubinvLocEnable:boolean = true;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private uiProvider: UiProviderService

  ) {
    this.route.queryParams.subscribe((params:any)=>{
      this.poSubItemDetails = params.selectedPoLineItem;
      this.index = params.selectedIndex,
      this.receiptPurchaseOrderItems = params.receiptPurchaseOrderItems,
      this.itemNumber = this.receiptPurchaseOrderItems[this.index].ItemNumber;
			this.destination = this.receiptPurchaseOrderItems[this.index].DestinationType;
    })
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

  goToKeypad (event:any) {
    if(event){
			this.checkQuantityValidation(event?.detail?.value);
		}
  }

   checkQuantityValidation(quantityReceived: string) {
		const currentPurchaseOrderItem: any = this.receiptPurchaseOrderItems[this.index];
		let quantityRemaining: number = Number(currentPurchaseOrderItem.QtyRemaining);

    if (quantityRemaining < Number(quantityReceived)) {
      this.receiptPurchaseOrderItems[this.index].QTY = ''
      this.uiProvider.showError(ERROR_MESSAGE.LESS_QUANTITY);
    } else {
      this.receiptPurchaseOrderItems[this.index].QTY = quantityReceived;
    }
	}

  onChange (event:any) {
    console.log(event, 'event')
  }

  // isSubInvValid (purchaseOrderItem:any):boolean {
  //   return purchaseOrderItem && purchaseOrderItem.IsSubinventoryRestricted.toLowerCase() === 'false' ? true : false;
  // }



}
