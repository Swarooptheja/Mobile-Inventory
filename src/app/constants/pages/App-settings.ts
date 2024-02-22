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
    get serialTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getSerialTableType`},
    get getLocatorsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLocators` },



    // Config APIs
    get getReasonsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getreasons` },
    get getGLPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getGLPeriods` },
    get getInventoryPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getInventoryPeriods` },
    get getPurchasingPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchasingPeriods` },

    //GoodsReceipt API's
    get goodsReceiptUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getDocumentsForReceiving` },

    get createGoodsReceiptTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createGoodsReceiptTransactions`},




    //    
    //     get getitemsTableType() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemsTable` },
    //     get getGLAccounts() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getglaccounts` },
    //     get getSubinventoriesUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSubinventories` },
    //     get itemsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItems` }, // Offline Itemdetails  api
    //     get getRestrictedSubinventoriesUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getRestrictedSubinventories` },
    //     get locatorsTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getLocatorsTable` },
    //     get operatingUnitList() { return fetchUrl.getUrl + "operatingunits/" + AppConfig.ROUTE_PARAM }, // Operating unit rest service
    //     get inventoryOrgList() { return fetchUrl.getUrl + "inventories/" + AppConfig.ROUTE_PARAM }, // Inventory org list rest service.
    //     get subinvinterfaceUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createSubInventoryTransfers` }, // Subinventory interface rest service.(venkat)
    //     get logoutUrl() { return fetchUrl.getUrl + "logout/" + AppConfig.ROUTE_PARAM }, // Logout rest service.(venkat)
    //     get createMiscIssuesAndReceipts() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createMiscIssuesAndReceipts` },  // Misc Interface rest service.
    //     get GrbarcodeHdr() { return fetchUrl.getUrl + "goodsreceiptbarcode/" + AppConfig.ROUTE_PARAM }, // GR Barcode rest service.
    //     get Grinterfacecsv() { return fetchUrl.getUrl + "generatereceipt/" + AppConfig.ROUTE_PARAM }, // Interface rest service for GenerateReceipt.
    //     get goodsReceiptUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getDocumentsForReceiving` },
    //     get subInvUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}subInventories` }, //fetchUrl.getUrl + "subinventories/" + AppConfig.ROUTE_PARAM }, // Offline subinventory transfor api

    //     get invOrgUrl() { return fetchUrl.getUrl + "inventories/" + AppConfig.ROUTE_PARAM }, // Offline Inventoryorg  api
    //     get lotUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLots` },//fetchUrl.getUrl + "lots/" + AppConfig.ROUTE_PARAM }, // Offline lots  api
    //     get getLotsTableType() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getLotsTableType`},//fetchUrl.getUrl + "lots/" + AppConfig.ROUTE_PARAM, // Offline lots  api
    //     get serialUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSerials` },//fetchUrl.getUrl + "serials/" + AppConfig.ROUTE_PARAM }, // Offline lots  api
    //     get locatorsUrl() { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}locators` }, // fetchUrl.getUrl + "locators/" + AppConfig.ROUTE_PARAM }, // Offline Locators  api
    //     get getLocatorsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLocators` },
    //     get getEmployeesUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getEmployees`},
    //     get getLocationsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLocations`},
    //    get getAccountAliases() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getAccountAliases`},
    //    get getUnitOfMeasuresConversionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getUnitOfMeasuresConversions`},
    //    get getItemRevisionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemRevisions`},
    //    get getWorkOrdersoperationsUrl () { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersoperations`},
    //    get getWorkOrdersForAssembllyMoveUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForAssemblyMove`},
    //    get getShippingNetworksUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getShippingNetworks`},
    //    get getOnhnadTableTypeUrl () { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getOnhnadTableType`},

    //     get getRestrictedLocatorsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getRestrictedLocators` },
    //     // get getitemsTableType() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemsTable` }, // Offline Itemdetails  api
    //     get poInspectionPoDetailsUrl() { return fetchUrl.getUrl + "poinspectionpodetails/" + AppConfig.ROUTE_PARAM }, // Offline poinspection main api
    //     get poinspectionQtyCodeUrl() { return fetchUrl.getUrl + "qualitycodes/" + AppConfig.ROUTE_PARAM }, // Offline poinspection qualitycode url
    //     get poinspectioninterfaceUrl() { return fetchUrl.getUrl + "poinspectiontransaction/" + AppConfig.ROUTE_PARAM }, // Interface rest service for poinspection interface url.
    //     get poInspectionBarcodeUrl() { return fetchUrl.getUrl + "poinspectionbarcode/" + AppConfig.ROUTE_PARAM }, // Po inspection Barcode rest service.
    //     get moveOrderListUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getMoveOrders` },// Move Order  main  rest service.
    //     get moveorderBarcodeUrl() { return fetchUrl.getUrl + "MOBarcode/" + AppConfig.ROUTE_PARAM }, // Move order Barcode rest service.
    //     get directorgTransferReceipt() { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}directoryOrgTransfer` }, // // Url for directOrgtransfer receipt generation
    //     get getPurchaseOrdersForReturningUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchaseOrdersForReturning` },
    //     get returnsTransfer () { return fetchUrl.getUrl + "returnstrans/" + AppConfig.ROUTE_PARAM }, // // Url for returnsTransfer
    //     // onHandQty: fetchUrl.getUrl + "onhanddtls/" + AppConfig.ROUTE_PARAM, // Url for on hand details
    //     onHandQty: "assets/onHand.json", // Url for on hand details
    //     // poReceiptTransHistOnHand: fetchUrl.getUrl + "poreceipttranshist/" + AppConfig.ROUTE_PARAM, // Url for on po receipt transaction history
    //     poReceiptTransHistOnHand: "assets/poReceiptSummary.json", // Url for on po receipt transaction history
    //     // poPiTransHistOnHand: fetchUrl.getUrl + "popitranshist/" + AppConfig.ROUTE_PARAM, // Url for on po Inspection transaction history
    //     poPiTransHistOnHand: "assets/poInspectionSummary.json", // Url for on po Inspection transaction history
    //     // miscRecTransHistOnHand: fetchUrl.getUrl + "miscrecpthist/" + AppConfig.ROUTE_PARAM, // Url for on Misc Receipt transaction history
    //     miscRecTransHistOnHand: "assets/miscReceiptSummary.json", // Url for on Misc Receipt transaction history
    //     // miscIssueTransHistOnHand: fetchUrl.getUrl + "miscissuehist/" + AppConfig.ROUTE_PARAM, // Url for on Misc Issue transaction history
    //     miscIssueTransHistOnHand: "assets/miscIssueSummary.json", // Url for on Misc Issue transaction history
    //     // poReturnsTransHistOnHand: fetchUrl.getUrl + "portranshist/" + AppConfig.ROUTE_PARAM, // Url for on Po Returns transaction history
    //     poReturnsTransHistOnHand: "assets/PoReturnSummary.json", // Url for on Po Returns transaction history
    //     // subInvTransHistOnHand: fetchUrl.getUrl + "subinvtranshist/" + AppConfig.ROUTE_PARAM, // Url for on Sub Inv transaction history
    //     subInvTransHistOnHand: "assets/subInventoryTransferSummary.json", // Url for on Sub Inv transaction history
    //     // directOrgTransHistOnHand: fetchUrl.getUrl + "directorgtranshist/" + AppConfig.ROUTE_PARAM, // Url for on direct org transaction history
    //     directOrgTransHistOnHand: "assets/directOrgTransferSummary.json", // Url for on direct org transaction history
    //     // moveOrderTransHistOnHand: fetchUrl.getUrl + "moveordertranshist/" + AppConfig.ROUTE_PARAM, // Url for on move order transaction history
    //     moveOrderTransHistOnHand: "assets/MoveOrdersSummary.json", // Url for on move order transaction history
    //    get getCycleCountItemsUrl () { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getCycleCountItems`},//fetchUrl.getUrl + "ccdetails/" + AppConfig.ROUTE_PARAM}, // // Url for cyclecount
    //    get createCycleCountTransactionsUrl () { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createCycleCountTransactions`},
    //    get cycleCountList() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}cycleCountList`},
    //    get materialIssueDetailsUrl () { return fetchUrl.getUrl + "eammaterialissue/" + AppConfig.ROUTE_PARAM}, // // Url for materialIssue
    //    get materialReturnDetailsUrl () { return fetchUrl.getUrl + "eammaterialreturn/" + AppConfig.ROUTE_PARAM}, // // Url for materialReturn
    //    get materialIssueTransUrl () { return fetchUrl.getUrl + "eammaterialtransaction/" + AppConfig.ROUTE_PARAM },// // Url for materialReturn
    //    get materialReturnTransUrl () { return fetchUrl.getUrl + "eammaterialreturntransaction/" + AppConfig.ROUTE_PARAM}, // // Url for materialReturn
    //    get getLpnsForWipCompletion() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLpnsForWipCompletion`},
    //    // wipjobdetailsUrl () { return fetchUrl.getUrl + "wipjobdetails/" + AppConfig.ROUTE_PARAM}, // // Url for joblist
    //    get wipCompleteTrans () { return fetchUrl.getUrl + "wipcompletetrans/" + AppConfig.ROUTE_PARAM}, // Url for wip transfer},
    //    get wipCompleteList () { return fetchUrl.getUrl + "wipcompletelist/" + AppConfig.ROUTE_PARAM}, // Url for joblist},
    //    // anchorLoginUrl() { return fetchUrl.getUrl + "login/12.2.2"}, // Login rest service
    //    get periodValidationUrl() { return fetchUrl.getUrl + 'periodvalidation/12.2.2'},
    //    get wipCompleteBatchUrl() { return fetchUrl.getUrl + 'wipbatchcomplete/' + AppConfig.ROUTE_PARAM},
    //    get packingListUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSalesOrdersForPacking`},
    //    get packingListTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23C}getSalesOrderForPackTable` },
    //    get putAwayListUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchaseOrdersForPutAway`},
    //    get putAwayTransactionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createputawaytransactions`},
    //    get receiptTransactionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createReceiptTransactions`},
    //    get serialNumbersUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}serialNumbers`},
    //    get shipingListUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSalesOrdersForShipping`},
    //    get shippingListTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getSalesOrdersForShippingTable` },
    //    get createPackTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPackConfirmTransactions`},
    //    get createShipTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createShipConfirmTransactions`},
    //    get createShipConfirmWithLPNs() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createShipConfirmWithLPNs`},
    //    get getReasonsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getreasons`},
    //    get moveOrderTransactionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createMoveOrderTransactions`},
    //    get moveOrderLoadDropTransactionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}createMoveOrderPickLoadDrops`},
    //    get packLpn() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLpnsForPack`},
    //    get getPoInspectionQualityCodeList() { return  `${fetchUrl.getUrl }${AppConfig.API_EBS_20D}getqualitycodes`},
    //    get getPurchaseOrderListForPoInspection() { return `${fetchUrl.getUrl }${AppConfig.API_EBS_20D}getPurchaseOrdersForInspection`},
    //    get poInspectionTransactionUrl() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createInspectionTransactions`},
    //    get createReturnTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createreturntransactions`},
    //    get getGLPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getGLPeriods`},
    //    get getInventoryPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getInventoryPeriods`},
    //    get getWorkOrdersForCompletionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForCompletion`},
    //    get getWorkOrdersForMaterialIssueUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForMaterialIssue`},
    //    get getWorkOrdersForMaterialReturnUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForMaterialReturn`},
    //    get createWIPCompleteTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createWIPCompleteTransactions`},
    //    get getDeliveriesForPODUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getdeliveriesforpod`},
    //    get createPODConfirmTransactions() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPODConfirmTransactions`},
    //    get createLPNPackUnpackTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createLPNPackUnpackTransactions`},
    //    get createLPNPackUnpackTransactionsNewUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createLPNPackUnPackTransactionsNew`}, // added Multiple lot
    //    get createWIPIssueTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createWIPIssueTransactions`},
    //    get createLPNSubInventoryTransfersUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createLPNSubInventoryTransfers`},
    //    get getLpnsForUnpackUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getlpnsforunpack`},
    //    get createLPNDirectOrgTransfersUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createLPNDirectOrgTransfers`},
    //    get createPutawayTasksUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPutawayTasks`},
    //    get getPutAwayTasksUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPutAwayTasks`},
    //    get getWorkOrdersForMoveAndCompletionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getWorkOrdersForMoveAndCompletion`},
    //    get getClosedWorkOrdersForOverCompletionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getClosedWorkOrdersForOverCompletion`},
    //    get createWIPMoveCompleteLPNPackTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createWIPMoveCompleteLPNPackTransactions`},
    //    get getLpnsForReceivingUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getlpnsforreceiving`},
    //    get verifyEmailToViewDemoURL() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}verifyemailtoviewdemo`}, // Login rest service
    //    saveUnregisteredUserContactDeatils: 'https://api.hubapi.com/crm/v3/objects/contacts?hapikey=',
    //    get getLPNContentsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLPNContents`},
    //    get getPhysicalCountItemsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPhysicalCountItems`},
    //    get createPhysicalCountTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPhysicalCountTransactions`},
    //    get getPhysicalCountDefinitionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPhysicalCountDefinitions`},
    //    get getInvOrganisationListUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getInventoryOrganizations`},//fetchUrl.getUrl + "lots/" + AppConfig.ROUTE_PARAM}, // Offline lots  api
    //    get getItemsInquiry() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getItemOnhandInquiry`},
    //    get getOnHandQuantitiesUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getOnHandQuantities`},
    //    get performLPNMergeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}performLPNMerge`},
    //    get performLpnSplitUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}performlpnsplit`},
    //    get getAssetsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getAssets`},
    //    get getEmployeesUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getEmployees`},
    //    get createFixedAssetTransferTransactions() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createFixedAssetTransferTransactions`},
    //    get getAllWMSTasksUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getAllWMSTasks`},
    //    get getCycleCountTasksUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getCycleCountTasks`},
    //    get performlotSplitUrl() { return `${AppConfig.ORDS_POST_ENDPOINT}postapi/LotSplit/LotSplitTran`},
    //    get performlotmergeUrl() { return `${AppConfig.ORDS_POST_ENDPOINT}postapi/LotMerge/LotMergeTran`},
    //    get getSalesOrdersUrl() { return `${AppConfig.ORDS_ENDPOINT}SalesOrders/getSalesOrders`},
    //    get getRMAsUrl() { return `${AppConfig.ORDS_ENDPOINT}ReturnOrders/getReturnOrders`},
    //    get getReturnReasonsUrl() { return `${AppConfig.ORDS_ENDPOINT}ReturnReasons/getReturnReasons`},
    //   // getRequisitionHistoryUrl() { return `${AppConfig.ORDS_ENDPOINT}PurchaseRequisitions/getPurchaseRequisitions`},
    //    get getRequisitionHistoryUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchaseRequisitions`},
    //    get getPlanningReportUrl() { return `${AppConfig.ORDS_ENDPOINT}PlanningReport/getPlanningReport`},
    //    get createRMAUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createRMA`},
    //    get createSalesOrderUrl() { return `${AppConfig.ORDS_ENDPOINT}SalesOrder/CreateUpdate`},
    //    get getInvoicesUrl() { return `${AppConfig.ORDS_ENDPOINT}Invoices/getInvoices`},
    //    // createPurchaseRequisitionUrl() { return `${AppConfig.ORDS_ENDPOINT}PurchaseRequisition/Create`},
    //    get createPurchaseRequisitionUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPurchaseRequisitionsTransactions`},
    //    get getSalesOrdersForPicking() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getSalesOrdersForPicking`},
    //    get createPickConfirmTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPickConfirmTransactions`},
    //    get getPurchasingPeriodsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getPurchasingPeriods`},
    //    get createGoodsReceiptTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createGoodsReceiptTransactions`},
    //    get createSubinventoryTransfersNewUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createSubinventoryTransfersNew`},
    //    get createPutawayTransactionsNewUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createPutawayTransactionsNew`},
    //    get createWIPIssueReturnTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createWIPIssueReturnTransactions`},
    //     // post api for assembly move
    //    get createWipAssemblyMoveTransactionsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createWipAssemblyMoveTransactions`},
    //    get createScheduledManualCycleCountsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createScheduledManualCycleCounts`},
    //     // shivom (assembly move starts)
    //     //  shivom (assemble move ends)
    //    get getLPNsTableUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getLPNsTable`},
    //    get getUserDetails() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getUserDetails`},//`http() { return//192.168.29.208() { return3000/${AppConfig.API_VERSION22A}getUserDetails`},
    //    get getOnHandQuantitiesWMS() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getOnHandQuantitiesWMS`},
    //    get getItemInstanceLocations() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getItemInstanceLocations`},
    //    get getItemInstanceStatuses() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getItemInstanceStatuses`},
    //    get getItemInstances() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getItemInstances`},
    //    get createAssetTrackingTransactions() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}createAssetTrackingTransactions`},  // Assets TXN rest service.
    //    get getOpenASNsPalletsForReceiving() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getOpenASNsPalletsForReceiving`},
    //    get getASNsForPrimaryReceipt() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getASNsForPrimaryReceipt` },//Get Primary Receipt.
    //    get getASNsForSecondaryReceipt() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getASNsForSecondaryReceipt`},//Get Secondary Receipt.
    //    get createSecondaryReceiptTransactions() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}createSecondaryReceiptForASN`},  // Secondary Receipt.
    //    get createPrimaryReceiptTransactions() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}createPrimaryReceiptForASN`},  // Primary Receipt.
    //    get getListOfAttachments() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_0220}getListOfAttachments`},
    //    //http//nodejs.propelapps.com() { return3000/EBS/0220/getListOfAttachments/'BOM_OPERATION_SEQUENCES'/257818/''`},
    //    get getLpnforSOPack() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getLpnforSOPack`},
    //    get getLocatorsWithSegmentsUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getlocatorswithsegments`},
    //    get getCycleCountsTableTypeUrl () { return  `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}getCycleCountsTableType`},
    //    get getAssemblySerials() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getAssemblySerials`},
    //    get serialTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}getSerialTableType`},
    //    get createLPNContainers() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_0220}createLPNContainers`},
    //    get updateDeliveryLanes() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_20D}updateDeliveryLanes`},
    //    get getSerialTransactionDetails() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_0220}getSerialTransactions`},
    //    get getSerialDetails() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getSerialDetails`},
    //    get createMultiSegmentSubInvTransfers() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22A}createMultiSegmentSubInvTransfers`},
    //    get getIntransitLocationsUrl() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_20C}getIntransitLocations`},
    //    get getShippingMethods() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getShippingMethods`},
    //    get createMiscIssuesAndReceiptsNew() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}createMiscIssuesAndReceipts`},  // Misc Interface rest service.
    //    get getItemOnhandLocators() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getItemOnhandLocators`},
    //    get getItemOnhandLocatorsWithQueryParams() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23C}getItemOnhandLocators` },
    //    get getOnHandWMSFilterTableType() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getOnHandWMSFilterTableType`},
    //    get getOnHandWMSFilterTableTypeWithQueryParams() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getOnHandWMSFilterTableType` },
    //    get getSerialsIssuedForWorkOrders() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getSerialsIssuedForWorkOrders`},
    //    get getAllLocatorSegments() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_22C}getAllLocatorSegments`},
    //    get getResolutionsAndJustifications() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23C}getResolutionsAndJustificationswithItem`},
    //    get getPaginationsBatch() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getPaginationsBatch`},
    //    get getSerialsForInternalOrders() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getSerialsForInternalOrders`},
    //    get checkoutDocuments() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}checkoutDocuments `},
    //    get getItemCrossReferences() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getItemCrossReferences`},
    //    get getHRLocations() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getHRLocations` },//Get Primary Receipt Location.
    //    get getSerialsForASNs() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getSerialsForASNs`},
    //    get getPalletDetails() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getPalletDetails`},
    //    get createPalletBoxTransfers() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_23B}createPalletBoxTransfers`},
    //    get createNonStandardWO() { return`${fetchUrl.getUrl}${AppConfig.API_EBS_23C}createNonStandardWO`},

    //     // Table Types APIs
    //     get getInvOrganisationListTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getInventoryOrganizationsTable` },
    //     get getlocatorswithsegmentsTableTypeUrl() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23A}getLocatorsWithSegmentTable` },
    //     get getMoveOrdersTable() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23B}getMoveOrdersTable` },// Move Order  main  rest servic\

    //     get updateTranactionHistory() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23C}updateTranactionHistory` },
    //     get getSubInventoriesForTriage() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23C}getSubInventoriesForTriage` },
    //     get getRefreshedCounts() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_23D}getRefreshedCounts` },
    //     get getSubInventoriesForDecom() {return `${fetchUrl.getUrl}${AppConfig.API_EBS_24A}getSubInventoriesForDecom`},
    //     get getResolutionsAndJustificationswithItemDecom() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_24A}getResolutionsAndJustificationswithItemDecom`},
    //     get getSerialsForShipConfirm() { return `${fetchUrl.getUrl}${AppConfig.API_EBS_24A}getSerialsForShipConfirm` },
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
    PLEASE_SELECT_SUBINV:'Please select subinventory'
};

export const MESSAGE = {
    PLEASE_WAIT: 'Please wait...',
    LOGIN_SUCCESS: 'Login Success',
    DATA_LOADING: 'Please wait data is loading ...',
    LOGOUT: 'Are you sure want to logout ?',
    ORGANIZATIONS_PAGE: 'Are you sure want to change Inventory OrgId'
};

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
    GOODS_RECEIPT_DOCS_RECEIVING: 'GOODS_RECEIPT_DOCS_RECEIVING'
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
  GOODS_RECEIPT_DOCS_RECEIVING: 'GOODS_RECEIPT_DOCS_RECEIVING'


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
    goods_receipt_docs_receiving: 'goods receipt docsreceiving'
};

export const ROUTE_PATHS={
    LOGIN: 'login',
    ALL_USER_ORGANIZATION_LIST: 'all-user-organization-list',
    ACTIVITY: 'activity',
    GOODS_RECEIPT_PO_LIST_PAGE:'goods-receipt-po-list',
    DASH_BOARD: 'dashboard',
    GOODS_RECEIPT_ITEMS_PAGE:'goods-receipt-items',
    GOODS_RECEIPT_ITEM_DETAILS_PAGE:'goods-receipt-item-details',
    COMMON_MODEL: 'common-model'
};

export const CONSTANTS = {
    LAST_SYNC_TIME:'LAST_SYNC_TIME',
    queryLimitSize:50
}
export const QUERIES = {
    GOODS_RECEIPT: {
        GET_PURCHASE_ORDERS_LIST: `SELECT *, COUNT(PoHeaderId) as ItemsCount, SUM(QtyRemaining <= 0) as FullyReceivedCount
        FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} GROUP BY PoHeaderId, PoReleaseId, ShipmentHeaderId, RMANumber`,
        GET_PURCHASE_ORDER_ITEMS: `SELECT * FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} WHERE PoHeaderId = ? and PoReleaseId = ? and ShipmentHeaderId = ? and RMANumber = ? 
        ORDER BY PoLineNumber, ShipmentNumber ASC`,
        GET_PURCHASE_ORDERS_LIST_WITH_LIMIT: `SELECT *, COUNT(PoHeaderId) as ItemsCount, SUM(QtyRemaining <= 0) as FullyReceivedCount
        FROM ${TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING} WHERE PoNumber LIKE ? OR ShipmentNumber LIKE ? OR RMANumber LIKE ? OR VendorName LIKE ? OR SourceTypeCode LIKE? OR Requestor LIKE? GROUP BY PoHeaderId, PoReleaseId, ShipmentHeaderId, RMANumber LIMIT ${CONSTANTS.queryLimitSize} OFFSET ?`,
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
    }

};

export enum LOCATOR_TYPE_CODE {
    NO_LOCATOR = 1,
    PREDEFINED_LOCATOR = 2,
    DYNAMIC_ENTRY_LOCATOR = 3
  }

