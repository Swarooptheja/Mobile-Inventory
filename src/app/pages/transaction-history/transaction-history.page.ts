import { Component, OnInit, Query } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ERROR_MESSAGE, MESSAGE, QUERIES, ROUTE_PATHS } from 'src/app/constants/pages/App-settings';
import { TransactionhistoryService } from './transactionhistory.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';
import { NetworkproviderService } from 'src/app/providers/network/networkprovider.service';
import { GoodsReceiptDataService } from '../goods-receipt-po-list/goods-receipt-data.service';
import { firstValueFrom } from 'rxjs';
import { Header } from 'src/app/components/header/header';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {
  heading: string = Header.TRANSACTION_HISTORY;
  isBack: boolean = true;
  transactionData:any = [];
  isOnline: any;
  isSync: boolean = false;
  constructor(
    private navCtrl: NavController,
    private transactionHistoryService: TransactionhistoryService,
    private uiprovider: UiProviderService,
    private offlineDataService: OfflineDataService,
    private netWorkProvider: NetworkproviderService,
    private goodsReceiptService: GoodsReceiptDataService
  ) { 
    this.getTransactionHistoryData();
  }

  ngOnInit() {
  }
  checkNetWorkStatus () {
    // this.netWorkProvider.eventIsUserOnline.subscribe((isOnline: any)=>{
    //   this.isOnline = isOnline;
    // })
    if (this.netWorkProvider.isOnline() && this.transactionData.length) {
      const pendingTransactions = this.transactionData.find((resp: any) => resp.status === 'local');
      if (pendingTransactions) {
        this.isSync = true;
      }
    } 
  }

  goBackToPreviousPage () {
    this.navCtrl.navigateBack(ROUTE_PATHS.DASH_BOARD)
  }

  onPullRefresh(event: any) {
    this.getTransactionHistoryData();
    this.checkNetWorkStatus();
    setTimeout(() => {
      event.target.complete();
    }, 2000);

  };

  async getTransactionHistoryData () {
    try {
      const transactionHistoryData = await this.transactionHistoryService.getAllTransactionData();
      this.transactionData = transactionHistoryData;
      this.checkNetWorkStatus();
    } catch (error) {
      console.error(error);
    }
  }

  deletetransaction (id: any) {
    const index = this.transactionData.filter((item: any) => item.id === id);

    if (!index.length) {
      this.uiprovider.showError(ERROR_MESSAGE.NOT_PERFORM_DELETE_OPERATION)
      return
    }
    this.uiprovider.showDeleteConfirm().then((res)=>{
      res.present();
      res.onDidDismiss().then(async (data) => {
        if (data.role === 'confirm') {
          const query = QUERIES.TRANSACTION_HISTORY.DELETE;
          const params = [index[0].id];
          await this.offlineDataService.deleteQuery(query, params);
          this.transactionData.splice(index,1);
          this.onPullRefresh(null)
          this.uiprovider.showSuccess(MESSAGE.DELETE_FROM_TRANSACTION_TABLE);
        }

    })
    })
  };

  async syncData () {
    try {
      this.uiprovider.getCustomLoader(MESSAGE.SYNC_TRANSACTION_HISTORY);
      const response = await this.goodsReceiptService.postGoodsReceiptTransaction('Transaction History');
      const result = await Promise.all(response);

      result.forEach(async (res: any) => {
        if (res.result === 'Success') {
          this.uiprovider.dismissLoader();
          this.uiprovider.showSuccess(MESSAGE.TRANSACTION_SUCCESS);
          await this.goodsReceiptService.performDeltaSyncOperation();
          this.uiprovider.dismissSuccess();
          return;
        } else if (res.result === 'Error') {
          this.uiprovider.dismissLoader();
          this.uiprovider.showError(MESSAGE.TRANSACTION_FAILED);
          await this.uiprovider.dismissSuccess();
          return;
        } else {
          this.uiprovider.dismissLoader();
          this.uiprovider.showError(MESSAGE.TRANSACTION_FAILED);
        }

      });
      this.onPullRefresh(null);
      // const transactionHistoryData = await this.transactionHistoryService.getAllTransactionData();
      // this.transactionData = transactionHistoryData;

      // const localTransactions = transactionHistoryData.filter((transaction: any) => transaction.status === 'local');

      // if(localTransactions.length) {
      //   const payloads = this.goodsReceiptService.goodsReceiptPayload(localTransactions);


      //   const response:any = await firstValueFrom(this.goodsReceiptService.performPostOperation(payloads));
      //   if(response) {
      //     this.handleResponse(response, localTransactions);
          
      //   };
    
      // }
      // else {
      //   await this.uiprovider.dismissLoader();
      //   this.uiprovider.showError(ERROR_MESSAGE.NO_PENDING_TRANSACTIONS);
      // }
      // this.uiprovider.dismissLoader();
    } catch (error) {
      console.error(error);
      
    }
  }

  // handleResponse (response: any, localTransactions: any) {
  //   if(response && response['Response']) {
  //     const Response = response['Response'];

  //     localTransactions.forEach(async(item: any)=>{
  //       const transaction = Response.find((res:any)=> res.PoLineLocationId === item.PoLineLocationId);
  //       if(transaction && transaction.RecordStatus === 'S') {
  //         this.uiprovider.dismissLoader();
  //         this.uiprovider.showSuccess(MESSAGE.TRANSACTION_SUCCESS);
  //         const params = [
  //           transaction.ReceiptNumber,
  //           transaction.Message,
  //           transaction.RecordStatus,
  //           item.id
  //         ]
  //          this.updateTransactionHistory(params)
  //       } else if(transaction && transaction.RecordStatus === 'E') {
  //         this.uiprovider.dismissLoader();
  //         this.uiprovider.showError(MESSAGE.TRANSACTION_FAILED);
  //         const params = [
  //           transaction.ReceiptNumber,
  //           transaction.Message,
  //           transaction.RecordStatus,
  //           item.id
  //         ];
  //         const updateQtyParams = [
  //           parseInt(transaction.QTY) + transaction.QtyRemaining,
  //           transaction.OrderLineId,
  //           transaction.PoLineLocationId,
  //           transaction.ShipmentLineId
  //         ];
  //          this.updateTransactionHistory(params);
  //          this.updateQtyRemaining(updateQtyParams)
           
  //       }
  //       else {
  //         this.uiprovider.dismissLoader();
  //         this.uiprovider.showError(MESSAGE.TRANSACTION_FAILED);
  //       }
  //     });
  //     this.onPullRefresh(null);
  //   }
  // };

  //  updateTransactionHistory (params: any) {
  //   try {
  //     this.offlineDataService.updateQuery(QUERIES.TRANSACTION_HISTORY.UPDATE, params)
  //   } catch (error) {
  //     console.error(error);   
  //   }

  // }
  // updateQtyRemaining (params: any) {
  //   try {
  //     const query = QUERIES.GOODS_RECEIPT.UPDATE_QTY_REMAINING;
  //     this.offlineDataService.updateQuery(query,params);
  //   } catch (error) {
  //     console.error(error);  
  //   }
  // }

 

}
