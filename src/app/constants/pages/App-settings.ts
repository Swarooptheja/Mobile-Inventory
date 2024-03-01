export const AppConfig = {
    API_EBS_BASEURL: 'https://testnode.propelapps.com/',
    ROUTE_PARAM: '12.1.3',
    API_EBS_20D: 'EBS/20D/',
    API_EBS_22A: 'EBS/22A/',
    API_EBS_22C: 'EBS/22C/',
    API_EBS_23A: 'EBS/23A/',
    API_EBS_23B: 'EBS/23B/',
    API_EBS_23C: 'EBS/23C/',
    API_EBS_23D: 'EBS/23D/',
    API_EBS_24A: 'EBS/24A/',
};
export const fetchUrl = {
    url() {
        return AppConfig.API_EBS_BASEURL;
    },
    get getUrl() {
        return this.url();
    },
};
export const Appsettings = {
    get loginURL() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}login`;
    },

    // All Master API's
    get getitemsTableType() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemsTable`;
    },
    get getGLAccounts() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getglaccounts`;
    },
    get getSubinventoriesUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSubinventories`;
    },
    get getRestrictedSubinventoriesUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getRestrictedSubinventories`;
    },
    get locatorsTableTypeUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getLocatorsTable`;
    },
    get getRestrictedLocatorsUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getRestrictedLocators`;
    },
    // get getInvOrganisationListUrl() {
    //     return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getInventoryOrganizations`;
    // },
    get getInvOrganisationListTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getInventoryOrganizationsTable` },
    get getEmployeesUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getEmployees`;
    },
    get getLocationsUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLocations`;
    },
    get getAccountAliases() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getAccountAliases`;
    },
    get getUnitOfMeasuresConversionsUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getUnitOfMeasuresConversions`;
    },
    get getItemRevisionsUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemRevisions`;
    },
    get getWorkOrdersoperationsUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersoperations`;
    },
    get getWorkOrdersForAssembllyMoveUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForAssemblyMove`;
    },
    get getShippingNetworksUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getShippingNetworks`;
    },
    get getOnhnadTableTypeUrl() {
        return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getOnhnadTableType`;
    },
    get getLotsTableType() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getLotsTableType` },
    get getserialTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getSerialTableType`},
    get getLocatorsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLocators` },



    // Config APIs
    get getReasonsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getreasons` },
    get getGLPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getGLPeriods` },
    get getInventoryPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getInventoryPeriods` },
    get getPurchasingPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchasingPeriods` },

    //GoodsReceipt API's
    get goodsReceiptUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getDocumentsForReceiving` },

    get createGoodsReceiptTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createGoodsReceiptTransactions`},

};

export const ERROR_MESSAGE = {
    USER_RESPONSIBILITIES_WITHOUT_OPERATING_UNIT:
        'Operating Unit is Null for the User Responsibilities',
    UNABLE_TO_REACH_SERVER: 'Unable to reach server.',
    SERVER_ERROR: 'Server connection error',
    PLEASE_CHECK_CREDENTIALS: 'Please check your credentials',
    PLEASE_ENTER_USERNAME: 'Please enter username',
    PLEASE_ENTER_PASSWORD: 'Please enter password',
    PLEASE_CHECK_YOUR_INTERNET_CONNECTION:
        'Please Check your internet connection',
    PLEASE_SELECT_ORGANIZATION: 'Please select organization',
    LESS_QUANTITY: 'Please provide a quantity it should be less than Qty remaining',
    INVALID_SCAN: 'Invalid Scan',
    PLEASE_SELECT_SUBINV:'Please select subinventory',
    PLEASE_SELECT_QTY: 'Please select quantity',
    NOT_AVAILABLE_SERIALS: 'Not available serials for this Item Number',
    NOT_AVAILABLE_LOT: 'Not available lots for this Item Number',
    PLEASE_SELECT_VALID_SERIALS: 'Please select valid serials',
    PLEASE_SELECT_VALID_LOT: 'Please select valid lot',
    TOTAL_SERIALS_SHOULD_BE:'Total serials should be equal to quantity',
    SELECTED_QTY_SHOULD_BE:'Entered quantity should not be more than quantity',
    PLEASE_SELECT_LOT_AND_ENTER_QTY: 'Please enter quantity and select lot number',
    PLEASE_ENTER_VALID_SUB_INV: 'Please enter valid subInventory',
    NOT_AVAILABLE_SUB_INV: 'Not available subInventories for this item Number',
    NOT_VALID_SUB_INV: 'Not valid SubInventory',
    NOT_AVAILABLE_LOCATORS: 'Not Availale locators for this subInventory',
    NOT_VALID_LOCATOR: 'Not valid Locator',
    PLEASE_SELECT_LOCATOR: 'Please select locator',
    PLEASE_SELECT_SERIALS: 'Please select serials',
    PLEASE_SELECT_LOTS: 'Please select lot',
    INVALID_PO_NUM: 'Invalid Purchase Order Number please try again',
    INVALID_ITEM_NUM: 'Invalid Item Order Number please try again',
    NOT_PERFORM_DELETE_OPERATION : 'You can not perform delete operation',
    NO_PENDING_TRANSACTIONS: 'No pending transactions',



};

export const MESSAGE = {
    PLEASE_WAIT: 'Please wait...',
    LOGIN_SUCCESS: 'Login Success',
    DATA_LOADING: 'Please wait data is loading ...',
    LOGOUT: 'Are you sure want to logout ?',
    ORGANIZATIONS_PAGE: 'Are you sure want to change Inventory OrgId',
    TRANSACTION_SUCCESS: 'Transaction Successful',
    TRANSACTION_FAILED: 'Transaction failed',
    DELETE_FROM_TRANSACTION_TABLE: 'Deleted from transaction table successfully',
    SAVED_GOODS_RECEIPT_DATA_LOCALLY: 'Transaction saved locally',
    SYNC_TRANSACTION_HISTORY: 'Syncing Started ...'
};

export const CONFIRM_MESSAGES = {
    LOG_OUT: 'Log Out',
    ORGANZATION: 'Organization'
}

export const TABLE_NAME = {
    INVENTORY_ORG_LIST: 'INVENTORY_ORG_LIST',
    ITEMS_DETAILS: 'ITEMS_DETAILS',
    ACCOUNTLIST: 'ACCOUNTLIST',
    SUBINVENTORY: 'SUBINVENTORY',
    RESTRICTED_SUBINVENTORY: 'RESTRICTED_SUBINVENTORY',
    LOCATORS: 'LOCATORS',
    RESTRICTED_LOCATORS: 'RESTRICTED_LOCATORS',
    EMPLOYEELIST: 'EMPLOYEELIST',
    LOCATIONLIST: 'LOCATIONLIST',
    ACCOUNT_ALIAS: 'ACCOUNT_ALIAS',
    UOM_CONVERSION: 'UOM_CONVERSION',
    ITEM_REVISION: 'ITEM_REVISION',
    WIP_OPERATIONS: 'WIP_OPERATIONS',
    FROM_OPERATION: 'FROM_OPERATION',
    SHIPPING_NETWORKS: 'SHIPPING_NETWORKS',
    ON_HAND_QUANTITY: 'ON_HAND_QUANTITY',
    REASON: 'REASON',
    GL_PERIODS: 'GL_PERIODS',
    INVENTORY_PERIODS: 'INVENTORY_PERIODS',
    PURCHASING_PERIODS: 'PURCHASING_PERIODS',
    GOODS_RECEIPT_DOCS_RECEIVING: 'GOODS_RECEIPT_DOCS_RECEIVING',
    SERIALS: 'SERIALS',
    LOT: 'LOT',
    TRANSCTION_TABLE_RECEIPT: 'TRANSCTION_TABLE_RECEIPT'
};

export const RESPONSIBILITIES = {
  INVENTORY_ORG: 'INVENTORY_ORG',
  ITEM: "ITEM",
  ACCOUNT: "ACCOUNT",
  SUB_INV: "SUB_INV",
  RESTRICTED_SUB_INV:'RESTRICTED_SUB_INV',
  LOCATORS: 'LOCATORS',
  RESTRICTED_LOCATORS: 'RESTRICTED_LOCATORS',
  EMPLOYEE: 'EMPLOYEE',
  LOCATION: 'LOCATION',
  ACCOUNT_ALIAS: 'ACCOUNT_ALIAS',
  UOM_CONVERSION: 'UOM_CONVERSION',
  ITEM_REVISION: 'ITEM_REVISION',
  WIP_OPERATIONS: 'WIP_OPERATIONS',
  DIRECT_ORG_TRANSFER: 'DIRECT_ORG_TRANSFER',
  FROM_OPERATION: 'FROM_OPERATION',
  ON_HAND_QUANTITY: 'ON_HAND_QUANTITY',
  REASON: 'REASON',
  GL_PERIODS: 'GL_PERIODS',
  INVENTORY_PERIODS: 'INVENTORY_PERIODS',
  PURCHASING_PERIODS: 'PURCHASING_PERIODS',
  GOODS_RECEIPT_DOCS_RECEIVING: 'GOODS_RECEIPT_DOCS_RECEIVING',
  SERIALS: 'SERIALS',
  LOT: 'LOT'


};

export const TYPE_OF_APIS = {
    REGULAR: 'REGULAR',
    TABLETYPE: 'TABLETYPE',
    REGULAR_TRANSACTIONAL: 'REGULAR_TRANSACTIONAL'
};

export const API_CALLS_MESSAGES = {
    inventory_org_list: 'inventory org list',
    items_details: 'items details',
    accountlist: 'accountlist',
    subinventory: 'subinventory',
    restricted_subinventory: 'restricted subinventory',
    locators: 'locators',
    restricted_locators: 'restricted locators',
    employeelist: 'employeelist',
    locationlist: 'locationlist',
    account_alias: 'account_alias',
    uom_conversion: 'uom conversion',
    item_revision: 'item revision',
    wip_operations: 'wip operations',
    from_operation: 'from operation',
    shipping_networks: 'shipping networks',
    on_hand_quantity: 'on hand quantity',
    reason: 'reason',
    gl_periods: 'gl periods',
    inventory_periods: 'inventory periods',
    purchasing_periods: 'purchasing periods',
    goods_receipt_docs_receiving: 'goods receipt docsreceiving',
    serials:'serials',
    lot: 'lot'
};

export const ROUTE_PATHS={
    LOGIN: 'login',
    ALL_USER_ORGANIZATION_LIST: 'all-user-organization-list',
    ACTIVITY: 'activity',
    GOODS_RECEIPT_PO_LIST_PAGE:'goods-receipt-po-list',
    DASH_BOARD: 'dashboard',
    GOODS_RECEIPT_ITEMS_PAGE:'goods-receipt-items',
    GOODS_RECEIPT_ITEM_DETAILS_PAGE:'goods-receipt-item-details',
    COMMON_MODEL: 'common-model',
    TRANSACTION_HISTORY: 'transaction-history'
};

export const CONSTANTS = {
    LAST_SYNC_TIME:'LAST_SYNC_TIME',
    queryLimitSize:50,
    performDeltaSync: 60*6000
}
export const QUERIES = {
    GOODS_RECEIPT: {
        GET_PURCHASE_ORDERS_LIST: `SELECT *, COUNT(PoHeaderId) as ItemsCount, SUM(QtyRemaining <= 0) as FullyReceivedCount
        FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} GROUP BY PoHeaderId, PoReleaseId, ShipmentHeaderId, RMANumber`,
        GET_PURCHASE_ORDER_ITEMS: `SELECT * FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} WHERE PoHeaderId = ? and PoReleaseId = ? and ShipmentHeaderId = ? and RMANumber = ? 
        ORDER BY PoLineNumber, ShipmentNumber ASC`,
        GET_PURCHASE_ORDERS_LIST_WITH_LIMIT: `SELECT *, COUNT(PoHeaderId) as ItemsCount, SUM(QtyRemaining <= 0) as FullyReceivedCount
        FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} WHERE PoNumber LIKE ? OR ShipmentNumber LIKE ? OR RMANumber LIKE ? OR VendorName LIKE ? OR SourceTypeCode LIKE? OR Requestor LIKE? GROUP BY PoHeaderId, PoReleaseId, ShipmentHeaderId, RMANumber LIMIT ${CONSTANTS.queryLimitSize} OFFSET ?`,
        UPDATE_PURCHASE_ORDER_LIST: `UPDATE ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} SET QtyOrdered = ?, QtyReceived = ?, QtyRemaining = ? WHERE OrderLineId = ? AND PoLineLocationId = ? AND ShipmentLineId = ?`,
        DELETE_PURCHASE_ORDER_LIST: `DELETE ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} WHERE OrderLineId=? AND PoLineLocationId=? AND ShipmentLineId=?`,
        UPDATE_QTY_REMAINING: `UPDATE ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} SET QtyRemaining = ?, WHERE OrderLineId = ? AND PoLineLocationId = ? AND ShipmentLineId = ?`
    },

    RESTRICTED_SUBINVENTORY: {
        GET: `SELECT * FROM ${TABLE_NAME.RESTRICTED_SUBINVENTORY} WHERE InventoryOrgId = ? AND ItemNumber = ? ORDER BY SubInventoryCode ASC`,
        GET_BY_SUBINV_CODE: `SELECT * FROM ${TABLE_NAME.RESTRICTED_SUBINVENTORY} WHERE InventoryOrgId = ? AND SubInventoryCode = ?`
    },
    RESTRICTED_LOCATOR: {
        GET: `SELECT * FROM ${TABLE_NAME.RESTRICTED_LOCATORS} WHERE Locator = ?`,
        GET_BY_LOCATOR_AND_SUBINV_CODE_AND_ITEM_NO: `SELECT * FROM ${TABLE_NAME.RESTRICTED_LOCATORS} WHERE InventoryOrgId = ? AND Locator = ? AND SubInventoryCode = ? AND ItemNumber = ?`,

      },
    SUBINVENTORY: {
        GET:`SELECT * FROM ${TABLE_NAME.SUBINVENTORY} WHERE InventoryOrgId = ?`
    },
    LOCATOR: {
        GET:`SELECT * FROM ${TABLE_NAME.LOCATORS} WHERE SubInventoryCode = ?`
    },
    SERIALS: {
        GET:`SELECT * FROM ${TABLE_NAME.SERIALS} WHERE ItemNumber = ?`,
        DELETE: `DELETE ${TABLE_NAME.SERIALS} WHERE RowId= ?`,
        UPDATE: `UPDATE ${TABLE_NAME.LOT} SET `

    },
    LOT: {
        GET:`SELECT * FROM ${TABLE_NAME.LOT} WHERE ItemNumber = ?`,
        DELETE: `DELETE ${TABLE_NAME.LOT} WHERE ChildLot = ? AND ItemId = ? AND LocatorId = ? AND LpnId = ? AND SubinventoryCode = ?`,
        UPDATE: `UPDATE ${TABLE_NAME.LOT} SET `
    },
    TRANSACTION_HISTORY: {
        GET: `SELECT * FROM ${TABLE_NAME.TRANSCTION_TABLE_RECEIPT}`,
        DELETE: `DELETE FROM ${TABLE_NAME.TRANSCTION_TABLE_RECEIPT} WHERE id = ?`,
        UPDATE: `UPDATE ${TABLE_NAME.TRANSCTION_TABLE_RECEIPT} SET  receiptInfo = ?, error = ?, status = ? WHERE id = ?`
    }

};

export enum LOCATOR_TYPE_CODE {
    NO_LOCATOR = 1,
    PREDEFINED_LOCATOR = 2,
    DYNAMIC_ENTRY_LOCATOR = 3
  }

export enum POST_TRANSACTION_DESTINATIONS {
    RECEIVING = 'Receiving',
    INVENTORY = 'Inventory'
};

