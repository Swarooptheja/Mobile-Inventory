import { TABLE_NAME } from "./pages/App-settings";




export const GOODS_RECEIPT_QUERIES = {
    RECEIPT:{
        CREATE_TRANSACTIONS_TABLE: `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.TRANSCTION_TABLE_RECEIPT} (
            id INTEGER PRIMARY KEY AUTOINCREMENT ,
            poNumber TEXT,
            titleName TEXT,
            syncStatus TEXT,
            createdTime TEXT,
            quantityReceived INTEGER,
            receiptInfo TEXT,
            error TEXT,
            status TEXT,
            shipLaneNum TEXT,
            vendorId TEXT,
            unitOfMeasure TEXT,
            poHeaderId TEXT,
            poLineLocationId TEXT,
            poLineId TEXT,
            poDistributionId TEXT,
            destinationTypeCode TEXT,
            itemNumber TEXT,
            Subinventory TEXT,
            Locator TEXT,
            ShipmentNumber TEXT,
            LpnNumber TEXT,
            OrderLineId TEXT,
            SoldtoLegalEntity TEXT,
            SecondaryUnitOfMeasure TEXT,
            ShipmentHeaderId TEXT,
            ItemRevision TEXT,
            ReceiptSourceCode TEXT,
            MobileTransactionId TEXT,
            TransactionType TEXT,
            AutoTransactCode TEXT,
            OrganizationCode TEXT,
            serialNumbers TEXT,
            lotQuantity TEXT,
            ChildLot TEXT,
            userId TEXT,
            personId TEXT,
            businessUnitId TEXT,
            responsibilityId TEXT,
            inventoryOrgId TEXT
            )`,
    }
}