import { TABLE_NAME } from "./pages/App-settings";




export const GOODS_RECEIPT_QUERIES = {
    RECEIPT:{
        CREATE_TRANSACTIONS_TABLE: `CREATE TABLE IF NOT EXISTS ${TABLE_NAME.TRANSCTION_TABLE_RECEIPT} (
            id INTEGER PRIMARY KEY AUTOINCREMENT ,
            PoNumber TEXT,
            titleName TEXT,
            syncStatus TEXT,
            createdTime TEXT,
            QTY TEXT,
            receiptInfo TEXT,
            error TEXT,
            status TEXT,
            PoShipmentNumber TEXT,
            VendorId TEXT,
            ItemUom TEXT,
            PoHeaderId TEXT,
            PoLineLocationId TEXT,
            PoLineId TEXT,
            PoDistributionId TEXT,
            DestinationType TEXT,
            ItemNumber TEXT,
            selectedSubInventory TEXT,
            selectedLocator TEXT,
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
            selectedLot TEXT,
            selectedSerials TEXT,
            lotQuantity TEXT,
            ChildLot TEXT,
            userId TEXT,
            personId TEXT,
            businessUnitId TEXT,
            responsibilityId TEXT,
            inventoryOrgId TEXT,
            QtyRemaining TEXT,
            Responsibility TEXT
            )`,
    }
}