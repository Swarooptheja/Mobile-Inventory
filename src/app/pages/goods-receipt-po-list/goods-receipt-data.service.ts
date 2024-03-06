import { Injectable } from '@angular/core';
import { Appsettings, ERROR_MESSAGE, MESSAGE, QUERIES } from 'src/app/constants/pages/App-settings';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';
import { Storage } from '@ionic/storage';
import { GlobalvariablesService } from 'src/app/providers/globalvariables/globalvariables.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BodyParamsService } from 'src/app/providers/body-params/body-params.service';
import { firstValueFrom } from 'rxjs';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { SyncDataService } from 'src/app/providers/All-apis/sync-data.service';

@Injectable({
  providedIn: 'root'
})
export class GoodsReceiptDataService {
  constructor(
    private offlineDataService: OfflineDataService,
    private globalVar: GlobalvariablesService,
    private httpClient: HttpClient,
    private bodyParams: BodyParamsService,
    private uiprovider: UiProviderService,
    private syncDataService: SyncDataService
  ) { }

  getReceiptPurchaseOrdersListFromDB(searchText = '', currentPage = 1): any {
    try {
      let params = [`${searchText}%`, `${searchText}%`, `${searchText}%`, `${searchText}%`, `${searchText}%`,
      `${searchText}%`, (currentPage - 1) * 50];
      return this.offlineDataService.executeQueryWithParams(QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDERS_LIST_WITH_LIMIT, params);


    } catch (error) {
      console.error(error);
    }

  }

  getReceiptPurchaseOrdersItemsFromDB(POHeaderId: string, poReleaseId: string, shipmentHeaderId: string, rmaNumber: string): any {
    try {
      const query = QUERIES.GOODS_RECEIPT.GET_PURCHASE_ORDER_ITEMS;
      const params = [POHeaderId, poReleaseId, shipmentHeaderId, rmaNumber];
      return this.offlineDataService.executeQueryWithParams(query, params);
    } catch (error) {
      console.error(error);
    }
  };

  saveReceiptTransaction(currentPurchaseOrderItem: any) {
    try {
      currentPurchaseOrderItem.forEach((element: any) => {
        element.USER_ID = this.globalVar.getUserId();
        element.ItemInfo = JSON.stringify({
          SourceTypeCode: element.SourceTypeCode,
          VendorName: element.VendorName,
          VendorSite: element.VendorSite,
          OrganizationCode: element.OrganizationCode,
          PONumber: element.PONumber,
          SoldtoLegalEntity: element.SoldtoLegalEntity,
          ItemNumber: element.ItemNumber,
          ItemId: element.ItemId,
          RoutingName: element.RoutingName,
          ProjectId: element.ProjectId,
          ProjectIdDisplay: element.ProjectNumber,
          TaskId: element.TaskId,
          TaskIdDisplay: element.TaskNum,
          ExpenditureTypeId: element.ExpenditureTypeId,
          ExpenditureTypeIdDisplay: element.ExpenditureTypeIdDisplay,
          ExpenditureItemDate: element.ExpenditureItemDate,
          OrganizationId: element.OrganizationId,
          OrganizationIdDisplay: element.OrganizationIdDisplay,
          TransactionType: "RECEIVE",
          AutoTransactCode: Object.is(element.RoutingName, "Direct delivery")
            ? "DELIVER"
            : "RECEIVE",
          VendorSiteId: element["VendorSiteId"],
          VendorId: element["VendorId"],
          SecondaryUnitOfMeasure: element["SecondaryUnitOfMeasure"] || "",
          ShipmentHeaderId: element["ShipmentHeaderId"] || "",
          ItemRevision: element["ItemRevision"] || "",
          POHeaderId: element["POHeaderId"],
          POLineLocationId: element["POLineLocationId"],
          POLineId: element["POLineId"],
          PODistributionId: element["PODistributionId"],
          ReasonName: element["ReasonName"] || "",
          ShipmentLineId: element["ShipmentLineId"] || "",
          lotItemLots: element['lotItemLots'] || [],
          serialItemSerials: element['serialItemSerials'] || [],
          lotSerialItemLots: element['lotSerialItemLots'] || [],
          ETag: element['ETag'] || '',
          ReceiptAdviceHeaderId: element['ReceiptAdviceHeaderId'] || "",
          ReceiptAdviceLineId: element['ReceiptAdviceLineId'] || "",
          TransferOrderHeaderId: element['TransferOrderHeaderId'] || "",
          TransferOrderLineId: element['TransferOrderLineId'] || "",
          CustomerId: element['CustomerId'] || ""
        });
      });
    } catch (error) {
      console.error(error)
    }
  };

  lotData(item: any) {
    const lotArray = item.map((lot: any) => {
      return ({
        GradeCode: '',
        LotExpirationDate: '',
        LotNumber: lot.ChildLot,
        ParentLotNumber: '',
        SecondaryTransactionQuantity: '',
        TransactionQuantity: lot.quantity,
      })
    })
    return lotArray;
  };

  serialData(item: any) {
    const serialArray = item.map((serial: any) => {
      return ({
        FromSerialNumber: serial.SerialNumber,
        ToSerialNumber: serial.SerialNumber
      })
    });
    return serialArray;
  };

  goodsReceiptPayload(currentPurchaseOrderItems: any) {
    const requestBody: any = {
      Input: {
        parts: this.generatePartPayload(currentPurchaseOrderItems)
      },
    };
    return requestBody;
  };

  generatePartPayload(currentPurchaseOrderItems: any) {
    const payload = currentPurchaseOrderItems.map((item: any, index: number) => {
      return ({
        id: `part${index + 1}`,
        path: '/receivingReceiptRequests',
        operation: 'create',
        payload: {
          ReceiptSourceCode: item.ReceiptSourceCode,
          OrganizationCode: item.OrganizationCode,
          EmployeeId: this.globalVar.getPersonId(),
          BusinessUnitId: this.globalVar.getOrgId(),
          ReceiptNumber: '',
          BillOfLading: item.BillOfLading,
          FreightCarrierName: item.FreightCarrierName,
          PackingSlip: item.Packingslip,
          WaybillAirbillNumber: item.WayBillAirBillNumber,
          ShipmentNumber: item.ShipmentNumber,
          ShippedDate: '',
          VendorSiteId: item.VendorSiteId,
          VendorId: item.VendorId,
          attachments: [],
          CustomerId: item.CustomerId,
          InventoryOrgId: this.globalVar.getInvOrgId(),
          DeliveryDate: '31-Jan-2024 12:00:00',
          ResponsibilityId: '20634',
          UserId: this.globalVar.getUserId(),
          DummyReceiptNumber: new Date().getTime(),
          BusinessUnit: 'Vision Operations',
          InsertAndProcessFlag: 'true',
          lines: [
            {
              ReceiptSourceCode: item.ReceiptSourceCode,
              MobileTransactionId: new Date().getTime(),
              TransactionType: 'RECEIVE',
              AutoTransactCode: 'DELIVER',
              OrganizationCode: item.OrganizationCode,
              DocumentNumber: item.PoNumber,
              DocumentLineNumber: item.PoShipmentNumber,
              ItemNumber: item.ItemNumber,
              TransactionDate: formatDate(new Date(), 'dd-MMM-yyyy HH:mm:ss', 'en-US'),
              Quantity: item.QTY,
              UnitOfMeasure: item.ItemUom,
              SoldtoLegalEntity: item.SoldtoLegalEntity,
              SecondaryUnitOfMeasure: '',
              ShipmentHeaderId: item.ShipmentHeaderId,
              ItemRevision: item.ItemRevision,
              POHeaderId: item.PoHeaderId,
              POLineLocationId: item.PoLineLocationId,
              POLineId: item.PoLineId,
              PODistributionId: item.PoDistributionId,
              ReasonName: item.ReasonName,
              Comments: item.Comments,
              ShipmentLineId: item.ShipmentLineId,
              transactionAttachments: [],
              lotItemLots: typeof (item.selectedLot) === 'object' ? (item.selectedLot ? this.lotData(item.selectedLot) : []) : (item.selectedLot ? this.lotData(JSON.parse(item.selectedLot)) : []),
              serialItemSerials: typeof (item.selectedSerials) === 'object' ? (item.selectedSerials ? this.serialData(item.selectedSerials) : []) : (item.selectedSerials ? this.serialData(JSON.parse(item.selectedSerials)) : []),
              lotSerialItemLots: [],
              ExternalSystemTransactionReference: 'Mobile Transaction',
              ReceiptAdviceHeaderId: item.ReceiptAdviceHeaderId,
              ReceiptAdviceLineId: item.ReceiptAdviceLineId,
              TransferOrderHeaderId: item.TransferOrderHeaderId,
              TransferOrderLineId: item.TransferOrderLineId,
              PoLineLocationId: item.PoLineLocationId,
              DestinationTypeCode: item.DestinationType,
              Subinventory: item.selectedSubInventory,
              Locator: item.selectedLocator,
              ShipmentNumber: item.ShipmentNumber,
              LpnNumber: item.LpnNumber,
              OrderLineId: item.OrderLineId,
            },
          ],
        },
      })
    });

    return payload;
  }

  saveTransactionHistory(item: any, responsibility: string) {
    return ({
      PoNumber: item.PoNumber,
      titleName: 'Goods Receipt',
      syncStatus: new Date(),
      createdTime: new Date(),
      QTY: item.QTY,
      receiptInfo: 'N/A',
      error: '',
      status: 'local',
      PoShipmentNumber: item.PoShipmentNumber,
      VendorId: item.VendorId,
      ItemUom: item.ItemUom,
      PoHeaderId: item.PoHeaderId,
      PoLineLocationId: item.PoLineLocationId,
      PoLineId: item.PoLineId,
      PoDistributionId: item.PoDistributionId,
      DestinationType: item.DestinationType,
      ItemNumber: item.ItemNumber,
      selectedSubInventory: item.selectedSubInventory || '',
      selectedLocator: item.selectedLocator || '',
      ShipmentNumber: "",
      LpnNumber: "",
      OrderLineId: "",
      SoldtoLegalEntity: "",
      SecondaryUnitOfMeasure: "",
      ShipmentHeaderId: "",
      ItemRevision: item.ItemRevision,
      ReceiptSourceCode: "",
      MobileTransactionId: "",
      TransactionType: "RECEIVE",
      AutoTransactCode: "DELIVER",
      OrganizationCode: "",
      serialNumbers: item.selectedSerials ? (item.selectedSerials.length > 0 ? item.selectedSerials.join(',') : " ") : '',
      selectedLot: JSON.stringify(item.selectedLot) || JSON.stringify([]),
      selectedSerials: JSON.stringify(item.selectedSerials) || JSON.stringify([]),
      lotQuantity: item.selectedLot ? (item.selectedLot.length ? this.lotData(item.selectedLot).map((el: any) => el.TransactionQuantity).join(',') : " ") : '',
      ChildLot: item.selectedLot ? (item.selectedLot.length ? this.lotData(item.selectedLot).map((el: any) => el.LotNumber).join(',') : " ") : '',
      userId: this.globalVar.getUserId(),
      personId: this.globalVar.getPersonId(),
      businessUnitId: this.globalVar.getOrgId(),
      responsibilityId: '20634',
      inventoryOrgId: this.globalVar.getInvOrgId(),
      QtyRemaining: parseInt(item?.QTY, 10) ? (item.QtyRemaining - parseInt(item.QTY, 10)) : item.QtyRemaining,
      Responsibility: responsibility,
      ShipmentLineId:item.ShipmentLineId
    });
  };

  performPostOperation(requestBody: any): any {
    try {
      requestBody = JSON.stringify(requestBody);
      const url = Appsettings.createGoodsReceiptTransactionsUrl;
      const headers = this.bodyParams.getHeaders();
      return this.httpClient.request('POST', url, { body: requestBody, headers: headers });
    } catch (error) {
      console.error(error);

    }
  };

  async postGoodsReceiptTransaction(mode: any, currentPurchaseOrderItem:any = {}) {
    try {
      // const userDetails = await this.globalVar.getUserDetails();
      // const responsibility = userDetails.find((resp: any) => resp.RESPONSIBILITY === Responsibility);
      // if(responsibility) {
      const transactionHistoryData = await this.getDataFromTransactionHistory(mode, currentPurchaseOrderItem);
      const localTransactions = transactionHistoryData.filter((transaction: any) => transaction.status === 'local');
      if (localTransactions.length) {
        const payload = this.goodsReceiptPayload(localTransactions);

        const response: any = await firstValueFrom(this.performPostOperation(payload));

        if (response) {
          const result = await this.handleResponse(response, localTransactions);
          return result
        }

      } else {
        await this.uiprovider.dismissLoader();
        this.uiprovider.showError(ERROR_MESSAGE.NO_PENDING_TRANSACTIONS);
      }
      this.uiprovider.dismissLoader();
      // } 
    } catch (error) {
      console.error(error);
    }
  }

  async getDataFromTransactionHistory(mode: any, currentPurchaseOrderItem: any = {}): Promise<any> {
    try {
      let query;
      let allTransactionData;
      if(mode === 'Online') {
        query = QUERIES.TRANSACTION_HISTORY.GET_CURRENT_ITEM;
        const params: any =[
          currentPurchaseOrderItem.OrderLineId,
          currentPurchaseOrderItem.PoLineLocationId,
          currentPurchaseOrderItem.ShipmentLineId
        ]
       
        allTransactionData = await this.offlineDataService.executeQueryWithParams(query, params);
      } else {
        query = QUERIES.TRANSACTION_HISTORY.GET;
        allTransactionData = await this.offlineDataService.executeQueryWithoutParams(query);
      }
      return allTransactionData
    } catch (error) {
      console.error(error);
    }
  };

  async handleResponse(response: any, localTransactions: any) {
    try {
      if (response && response['Response']) {
        const promises: any = [];
        const Response = response['Response'];

        localTransactions.forEach(async (item: any) => {
          const promise = new Promise(async (resolve, reject) => {
            try {
              const transaction = Response.find((res: any) => res.PoLineLocationId === item.PoLineLocationId);
              if (transaction && transaction.RecordStatus === 'S') {
                const params = [
                  transaction.ReceiptNumber,
                  transaction.Message,
                  transaction.RecordStatus,
                  item.id                                                                                                               
                ]
                this.updateTransactionHistory(params);
                resolve({
                  result: 'Success'
                })
              } else if (transaction && transaction.RecordStatus === 'E') {
                const params = [
                  transaction.ReceiptNumber,
                  transaction.Message,
                  transaction.RecordStatus,
                  item.id
                ];
                const updateQtyParams = [
                  parseInt(transaction.QTY) + transaction.QtyRemaining,
                  transaction.OrderLineId,
                  transaction.PoLineLocationId,
                  transaction.ShipmentLineId
                ];
                this.updateTransactionHistory(params);
                this.updateQtyRemaining(updateQtyParams)
                resolve({
                  status: 'Error'
                })
              }
              else {
                resolve({
                  status: 'Other'
                })
              }
            } catch (error) {
              console.error(error);
              reject(error);
            }
          });
          promises.push(promise);
        });
        return promises;
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateTransactionHistory(params: any) {
    try {
      this.offlineDataService.updateQuery(QUERIES.TRANSACTION_HISTORY.UPDATE, params)
    } catch (error) {
      console.error(error);
    }

  }
  updateQtyRemaining(params: any) {
    try {
      const query = QUERIES.GOODS_RECEIPT.UPDATE_QTY_REMAINING;
      this.offlineDataService.updateQuery(query, params);
    } catch (error) {
      console.error(error);
    }
  }

  async performDeltaSyncOperation() {
    try {
      const promiseArray = await this.syncDataService.sync(true);
      for (const { presenApi } of promiseArray) {
        const response = await presenApi;
        console.log(response, 'calling Delta Sync API')
      };
    } catch (error) {
      console.error(error);
    }
  }

}
