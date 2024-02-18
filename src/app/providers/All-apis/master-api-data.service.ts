import { Injectable } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { API_CALLS_MESSAGES, Appsettings, RESPONSIBILITIES, TABLE_NAME, TYPE_OF_APIS } from "../../constants/pages/App-settings"

@Injectable({
  providedIn: 'root'
})
export class MasterApiDataService {
  isDeltaSync:any = true;
  constructor(
    private fetchapidata: FetchApiDataService,

  ) { }

  //Sync all MasterData API's
  
  syncMasterDataAPIs(isDeltaSync: boolean) {
    let promiseArray: any = [
      { presentApi: this.getItems(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.inventory_org_list },
      { presentApi: this.getSubInventories(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.subinventory },
      { presentApi: this.getLocators(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.locators },
      { presentApi: this.getRestrictedSubInventories(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.restricted_subinventory },
      { presentApi: this.getRestrictedLocators(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.inventory_org_list },
      { presentApi: this.getEmployees(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.employeelist },
      { presentApi: this.getLocations(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.locationlist },
      { presentApi: this.getAccountAlias(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.account_alias },
      { presentApi: this.getUnitOfMeasuresConversions(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.uom_conversion },
      { presentApi: this.getItemRevisions(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.item_revision },
      { presentApi: this.getShippingNetworks(this.isDeltaSync), apimessage: API_CALLS_MESSAGES.shipping_networks },
    ];

    return promiseArray;
  }

  getInventoryOrganizations(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.INVENTORY_ORG_LIST, Appsettings.getInvOrganisationListTableTypeUrl, '', RESPONSIBILITIES.INVENTORY_ORG, TYPE_OF_APIS.TABLETYPE)
  }
  getItems(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.ITEMS_DETAILS, Appsettings.getitemsTableType, '', RESPONSIBILITIES.ITEM, TYPE_OF_APIS.TABLETYPE);
  }

  getGLAccounts(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.ACCOUNTLIST, Appsettings.getGLAccounts, 'GLAccounts', RESPONSIBILITIES.ACCOUNT, TYPE_OF_APIS.REGULAR);
  }

  getSubInventories(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.SUBINVENTORY,Appsettings.getSubinventoriesUrl, 'ActiveSubInventories',RESPONSIBILITIES.SUB_INV, TYPE_OF_APIS.REGULAR);
  }

  getRestrictedSubInventories(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.RESTRICTED_SUBINVENTORY, Appsettings.getRestrictedSubinventoriesUrl, 'RestrictedSubInventories', RESPONSIBILITIES.RESTRICTED_SUB_INV, TYPE_OF_APIS.REGULAR);

  }

  getLocators(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.LOCATORS, Appsettings.locatorsTableTypeUrl, '', RESPONSIBILITIES.LOCATORS, TYPE_OF_APIS.TABLETYPE);
  } 

  getRestrictedLocators(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.RESTRICTED_LOCATORS, Appsettings.getRestrictedLocatorsUrl, 'RestrictedLocators', RESPONSIBILITIES.RESTRICTED_LOCATORS, TYPE_OF_APIS.REGULAR);
  }

  getEmployees(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.EMPLOYEELIST, Appsettings.getEmployeesUrl, 'EmployeeList', RESPONSIBILITIES.EMPLOYEE, TYPE_OF_APIS.REGULAR);
  }
  getLocations(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.LOCATIONLIST, Appsettings.getLocationsUrl, 'LocationList', RESPONSIBILITIES.LOCATION, TYPE_OF_APIS.REGULAR);
  }

  getAccountAlias(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.ACCOUNT_ALIAS, Appsettings.getAccountAliases, 'AccountAliasesList', RESPONSIBILITIES.ACCOUNT_ALIAS,TYPE_OF_APIS.REGULAR);
  }

  getUnitOfMeasuresConversions(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.UOM_CONVERSION, Appsettings.getUnitOfMeasuresConversionsUrl, 'Items', RESPONSIBILITIES.UOM_CONVERSION,TYPE_OF_APIS.REGULAR);
  }

  getItemRevisions(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.ITEM_REVISION, Appsettings.getItemRevisionsUrl, 'Items',RESPONSIBILITIES.ITEM_REVISION, TYPE_OF_APIS.REGULAR);
  }
  getWorkOrdersoperations(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.WIP_OPERATIONS, Appsettings.getWorkOrdersoperationsUrl, 'WorkOrdersOperations', RESPONSIBILITIES.WIP_OPERATIONS, TYPE_OF_APIS.REGULAR);
  }
  getFromOperations(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.FROM_OPERATION, Appsettings.getWorkOrdersForAssembllyMoveUrl, 'WorkOrders4AssemblyMove',RESPONSIBILITIES.FROM_OPERATION, TYPE_OF_APIS.REGULAR);
  }

  getShippingNetworks(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.SHIPPING_NETWORKS, Appsettings.getShippingNetworksUrl, 'ShippingNetworks',RESPONSIBILITIES.DIRECT_ORG_TRANSFER, TYPE_OF_APIS.REGULAR);
  }

  getOnHandQuantities(isDeltaSync: boolean) {
    return this.fetchapidata.getDataFromAPI(isDeltaSync, TABLE_NAME.ON_HAND_QUANTITY, Appsettings.getOnhnadTableTypeUrl,'',RESPONSIBILITIES.ON_HAND_QUANTITY, TYPE_OF_APIS.TABLETYPE);
  } //pending
}
