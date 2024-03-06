import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { CONSTANTS, QUERIES, RESPONSIBILITIES, TABLE_NAME, TYPE_OF_APIS } from 'src/app/constants/pages/App-settings';
import { catchError, map, firstValueFrom } from 'rxjs';
import { GlobalvariablesService } from '../globalvariables/globalvariables.service';
import { Storage } from '@ionic/storage-angular'
import { formatDate } from '@angular/common';
import { GOODS_RECEIPT_QUERIES } from 'src/app/constants/queries';
import { BodyParamsService } from '../body-params/body-params.service';

interface ColumnObject {
  name: string;
  type: string;
  primarykey?: boolean; // Optional: set to `true` for primary keys
}

@Injectable({
  providedIn: 'root'
})
export class OfflineDataService {

  private database!: SQLiteObject;
  headers: any;
  constructor(
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private globalVar: GlobalvariablesService,
    private storage: Storage,
    private bodyParamsService: BodyParamsService
  ) {
    this.initSqlLiteDB();
  };

  ngOnInit () {
    this.headers = this.bodyParamsService.getHeaders();
  }
  async initSqlLiteDB() {
    try {
      if (!this.database) {
        this.database = await this.sqlite.create({
          name: 'my.db',
          location: 'default',
        });
        console.log(this.database, 'Database initialized successfully.');
      } else {
        console.log('Database already initialized.');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw new Error('Database initialization failed.');
    }
  };

  async deleteSqlLiteDB() {
    try {
      this.database = await this.sqlite.deleteDatabase({
        name: 'my.db',
        location: 'default'
      });
      console.log(this.database, 'Database Successfully Deleted');

    } catch (error) {
      console.error(error);
    }
  }

  async createTableForAPI(isDeltaSync: boolean, TableName: string, url: string, fieldName: string, responsibilities: string, typeOfApi: string) {
    try {
      let constructUrl: string = '';
      const invOrgId = this.globalVar.getInvOrgId();
      const businessUnitId = this.globalVar.getOrgId();
        if (responsibilities === RESPONSIBILITIES.INVENTORY_ORG || responsibilities === RESPONSIBILITIES.GL_PERIODS) {
          constructUrl = `${url}/${businessUnitId}`;
        }
        // OrganizationId along with lastsync time
        else if (responsibilities === RESPONSIBILITIES.FROM_OPERATION || responsibilities === RESPONSIBILITIES.WIP_OPERATIONS || responsibilities === RESPONSIBILITIES.ITEM_REVISION || responsibilities === RESPONSIBILITIES.UOM_CONVERSION || responsibilities === RESPONSIBILITIES.ITEM || responsibilities === RESPONSIBILITIES.LOCATORS) {
          constructUrl = `${url}/${invOrgId}/''`
        }
        //Params only OrgnizationId 
        else if (responsibilities === RESPONSIBILITIES.PURCHASING_PERIODS || responsibilities === RESPONSIBILITIES.ON_HAND_QUANTITY || responsibilities === RESPONSIBILITIES.DIRECT_ORG_TRANSFER || responsibilities === RESPONSIBILITIES.ACCOUNT_ALIAS || responsibilities === RESPONSIBILITIES.ACCOUNT) {
          constructUrl = `${url}/${invOrgId}`
        }
        // Params as OrganizationId, lastrefresh, fullRefresh
        else if (responsibilities === RESPONSIBILITIES.EMPLOYEE || responsibilities === RESPONSIBILITIES.SUB_INV || responsibilities === RESPONSIBILITIES.RESTRICTED_SUB_INV || responsibilities === RESPONSIBILITIES.RESTRICTED_LOCATORS) {
          constructUrl = `${url}/${invOrgId}/''/'Y'`
        }

        //Params as url
        else if (responsibilities === RESPONSIBILITIES.REASON) {
          constructUrl = `${url}`
        }
        //Params as BusinessUnitId and OrganizationId
        else if (responsibilities === RESPONSIBILITIES.INVENTORY_PERIODS) {
          constructUrl = `${url}/${businessUnitId}/${invOrgId}`
        }
        //Params as lastSyncTime and fullRefresh
        else if (responsibilities === RESPONSIBILITIES.LOCATION) {
          constructUrl = `${url}/''/'Y'`
        }
        // Transaction API's
        else if (responsibilities === RESPONSIBILITIES.GOODS_RECEIPT_DOCS_RECEIVING) {
          let currentDate = new Date();
          currentDate.setHours(currentDate.getHours()-12);
          this.storage.set(CONSTANTS.LAST_SYNC_TIME, formatDate(currentDate, 'dd-MMM-yyyy HH:mm:ss', 'en-US'));
          console.log(formatDate(new Date, 'dd-MMM-yyyy HH:mm:ss', 'en-US'));
          constructUrl = `${url}/${invOrgId}/''/'Y'`
        }
        else if (responsibilities === RESPONSIBILITIES.SERIALS) {
          constructUrl = `${url}/${invOrgId}/""/""/""`
        }
        else if (responsibilities === RESPONSIBILITIES.LOT) {
          constructUrl = `${url}/${invOrgId}/""`;
        }

      



      if (typeOfApi === TYPE_OF_APIS.REGULAR) {
        //Calling metadataUrls of all apis if it is regular
        const metadataResp = await firstValueFrom(this.getMetadataResponseFromAPI(url));
        //creating a table
        const createTableQuery = this.creatingTable(TableName, metadataResp);
        await this.database.executeSql(createTableQuery, []);
        console.log(`${TableName} table is created Successfully`);

        const response: any = await firstValueFrom(this.getReponseFromAPI(constructUrl));
        if (response) {
          await this.insertDataIntoTable(response[fieldName], TableName);
          return response;
        }
      } else if (typeOfApi === TYPE_OF_APIS.TABLETYPE) {
        // Never call a metadataUrls for Tabletype API's
        const tableTypeResp = await firstValueFrom(this.getResponseFromTableTypeApi(constructUrl));
        const metadataResp = this.convertToMetadata(tableTypeResp);
        const createTableQuery = this.creatingTable(TableName, metadataResp);
        await this.database.executeSql(createTableQuery, []);
        console.log(`${TableName} table is created Successfully`);
        // const response: any = await firstValueFrom(this.getReponseFromAPI(constructUrl));
        if (tableTypeResp) {
          const convertcsvToJson = this.csvToJson(tableTypeResp);
          await this.insertDataIntoTable(convertcsvToJson, TableName);
          return convertcsvToJson;
        }
      } else {
        if (fieldName) {
          if (!isDeltaSync) {
            const metadataResp = await firstValueFrom(this.getMetadataResponseFromAPI(url));

            const createTableQuery = this.creatingTable(TableName, metadataResp);

            await this.database.executeSql(createTableQuery, []);
            console.log(`${TableName} table is created Successfully`);
            const response: any = await firstValueFrom(this.getReponseFromAPI(constructUrl));
            // For creating a table for Transactions
            await this.database.executeSql(GOODS_RECEIPT_QUERIES.RECEIPT.CREATE_TRANSACTIONS_TABLE, []);
            console.log('Transaction Table is created')
            if (response) {
              await this.insertDataIntoTable(response[fieldName], TableName);
              return response;
            }
          } else {
            const lastSyncTime = await this.storage.get(CONSTANTS.LAST_SYNC_TIME);
            let currentDate = new Date();
            currentDate.setHours(currentDate.getHours()-12);
            if (responsibilities === RESPONSIBILITIES.GOODS_RECEIPT_DOCS_RECEIVING) {
              this.storage.set(CONSTANTS.LAST_SYNC_TIME, formatDate(currentDate, 'dd-MMM-yyyy HH:mm:ss', 'en-US'));
              constructUrl = `${url}/${invOrgId}/${lastSyncTime}/'N'`
            }
            const response: any = await firstValueFrom(this.getReponseFromAPI(constructUrl));

            if (response) {
              await this.deleteRecordandUpdateDeltaSyncAPIs(response[fieldName], TableName);
              return response;
            }

          }

        } else {
          const lastSyncTime = await this.storage.get(CONSTANTS.LAST_SYNC_TIME);
          if (isDeltaSync && responsibilities === RESPONSIBILITIES.SERIALS) {
            constructUrl = `${url}/${invOrgId}/${lastSyncTime}/""/""`
          }
          else if (isDeltaSync && responsibilities === RESPONSIBILITIES.LOT) {
            constructUrl = `${url}/${invOrgId}/${lastSyncTime}`
          }

          const tableTypeResp = await firstValueFrom(this.getResponseFromTableTypeApi(constructUrl));
          const metadataResp = this.convertToMetadata(tableTypeResp);

          if (!isDeltaSync) {
            const createTableQuery = this.creatingTable(TableName, metadataResp);
            await this.database.executeSql(createTableQuery, []);
            if (tableTypeResp) {
              const convertcsvToJson = this.csvToJson(tableTypeResp);
              await this.insertDataIntoTable(convertcsvToJson, TableName);
              return convertcsvToJson;
            }
          }
          if (tableTypeResp) {
            const convertcsvToJson = this.csvToJson(tableTypeResp);
            await this.deleteRecordandUpdateDeltaSyncAPIs(convertcsvToJson, TableName);
            return convertcsvToJson;
          }
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  creatingTable(tableName: any, matadataArray: any) {
    let createQuery = "CREATE TABLE IF NOT EXISTS " + tableName + "(";
    let primaryKeyQuery = "PRIMARY KEY (";
    let isPrimaryKeyAvailable = false;
    const metadataSet = new Set();
    const propertyArray = matadataArray.filter((item: any) => {
      const isDuplicate = metadataSet.has(item.name);
      metadataSet.add(item.name);
      return !isDuplicate;
    })
    for (let i = 0; i < propertyArray.length; i++) {
      const field = propertyArray[i];
      let type = field.type;
      if (type.toLowerCase() === "number") {
        type = "INTEGER";
      } else if (type.toLowerCase() === "string") {
        type = "TEXT";
      } else {
        type = "TEXT";
      }
      createQuery = createQuery + field.name + " " + type;
      if (field.primarykey || field.primaryKey) {
        isPrimaryKeyAvailable = true;
        primaryKeyQuery = primaryKeyQuery + field.name;
        if (i !== propertyArray.length - 1) {
          primaryKeyQuery = primaryKeyQuery + ",";
        }
      }
      if (i !== propertyArray.length - 1) {
        createQuery = createQuery + ",";
      }
    }

    //replace last char with ""
    primaryKeyQuery = primaryKeyQuery.replace(/.$/, "");
    //close primaryKeyQuery
    primaryKeyQuery = primaryKeyQuery + ")";
    // appending createQuery and primaryKeyQuery
    if (isPrimaryKeyAvailable) {
      createQuery = createQuery + "," + primaryKeyQuery;
    }
    //close createQuery
    createQuery = createQuery + ")";

    console.log("Create Table Query:", createQuery);
    // executing created query text
    return createQuery
  }


  async insertDataIntoTable(Resp: any, TableName: any) {
    console.log(Resp, "response")
    if (Resp.length > 0) {
      const collectColumnKeys = Object.keys(Resp[0]);
      const insertStatements: any[] = [];
      Resp.forEach((item: any) => {
        let collectColumnsValues = Object.values(item).map((element: any) => {
          if (typeof element === 'string') {

            return "'" + element.replace(/'/g, "") + "'";
          }
          if (typeof element === 'object') {
            return "''"
          }
          if (typeof element === 'number') {
            return element;
          }
          return element.replace(/'/g, "");
        }).join(',');
        insertStatements.push(collectColumnsValues)

      })
      const insertQuery = `INSERT OR REPLACE INTO ${TableName} (${collectColumnKeys.join(',')}) VALUES ${insertStatements.map((values: any) => `(${values})`).join(', ')}`
      console.log(insertQuery, "insertQuery")
      this.database.executeSql(insertQuery, []).then(() => {
        console.log(`Data is inserted in ${TableName}`);
      }).catch((error: any) => {
        console.log(`Error while inserting Data into table ${TableName}`)
      });
    } else {
      console.log(`No data is being inserted in table ${TableName}`)
    }
  }


  getMetadataResponseFromAPI(url: string):any {
    try {
      const metadataUrl = `${url}/metadata`;
      return this.httpClient.request('GET', metadataUrl, { 'headers': this.headers})
    } catch (error) {
      console.error(error)
      
    }
  }
  getResponseFromTableTypeApi(url: string): any {
    try {
      const metadataUrl = `${url}`
      return this.httpClient.request('GET', metadataUrl, { 'headers': this.headers })
    } catch (error) {
      console.error(error)
    }
  }


  getReponseFromAPI(url: string): any {
    console.log(url, 'construct url')
    try {
      return this.httpClient.request('GET', url, { 'headers': this.headers})
    } catch (error) {
      console.error(error)
    }
  }

  async executeQueryWithoutParams(query: string) {
    try {
      const executeQueryResponse = await this.executeQuery(query, []);
      const data = executeQueryResponse ? this.extractData(executeQueryResponse) : [];
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async executeQueryWithParams(query: string, params: any): Promise<any> {
    try {
      const executeQueryResponse = await this.executeQuery(query, params);
      const data = executeQueryResponse ? this.extractData(executeQueryResponse) : [];
      console.warn(data, 'insideparams')
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  extractData(res: any) {
    let list = [];
    if (!res.rows.length) {
      return [];
    }
    for (let i = 0; i < res.rows.length; i++) {
      list.push(res.rows.item(i));
    }
    console.warn(list);
    return list;
  }



  async executeQuery(query: any, params: any) {
    try {
      const data = await this.database.executeSql(query, params);
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return []
    }
  }


  convertToMetadata(tableTypeResp: any) {
    const Resp = [];
    const firstIndexofTableType = tableTypeResp[0];
    for (let i = 0; i < firstIndexofTableType.length; i++) {
      const columnName = firstIndexofTableType[i].replace("_PK", ""); // Remove _PK suffix
      const isPrimaryKey = firstIndexofTableType[i].includes("_PK");

      const columnObject: ColumnObject = {
        "name": columnName,
        "type": 'string'
      };

      if (isPrimaryKey) {
        columnObject.primarykey = true;
      };
      Resp.push(columnObject);
    }
    return Resp;
  };

  csvToJson(arr: any) {
    let [keys, ...rows] = arr;
    keys = keys.map((elem: any) => { return elem.replace('_PK', '') });
    let formatted = rows.map((row: any) => Object.assign({}, ...keys.map((key: any, idx: any) => ({ [key]: row[idx] }))));
    return formatted;
  }


  async deleteQuery(query: any, params: any) {
    try {
      await this.database.executeSql(query, params);
      console.log('deleted successfully')
    } catch (error) {
      console.error(error)
    }
  }


  async updateQuery(query: any, Params: any) {
    try {
      const updateHistory = await this.database.executeSql(query, Params);
      console.log('update data successfully')
    } catch (error) {
      console.error(error);

    }
  }

  async updateDeltaSyncAPIs(Response: any, TableName: any) {
    try {
      const query = QUERIES.GOODS_RECEIPT.UPDATE_PURCHASE_ORDER_LIST;
      await this.database.executeSql(query)
    } catch (error) {
      console.error(error);
    }
  }
  async deleteRecordandUpdateDeltaSyncAPIs(Response: any, TableName: any) {
    try {
      if (TableName === TABLE_NAME.GOODS_RECEIPT_DOCS_RECEIVING) {
        const query = QUERIES.GOODS_RECEIPT.DELETE_PURCHASE_ORDER_LIST;
        for (const data of Response) {
          if (data.Flag === 'D') {
            const params: any = [
              data?.OrderLineId,
              data?.PoLineLocationId,
              data?.ShipmentLineId
            ];
            await this.database.executeSql(query, params)
          } else {
            await this.insertDataIntoTable(Response, TableName);
            const params: any = [
              data?.QtyOrdered,
              data?.QtyReceived,
              data?.QtyRemaining,
              data?.OrderLineId,
              data?.PoLineLocationId,
              data?.ShipmentLineId
            ];
            await this.updateQuery(QUERIES.GOODS_RECEIPT.UPDATE_PURCHASE_ORDER_LIST, params)
          }
        }
      }
      if (TableName === TABLE_NAME.SERIALS) {
        const query = QUERIES.SERIALS.DELETE;
        for (const data of Response) {
          if (data.Flag === 'D') {
            const params: any = [
              data?.RowId
            ];
            await this.database.executeSql(query, params)
          } else {
            await this.insertDataIntoTable(Response, TableName);
            await this.updateQuery(QUERIES.SERIALS.UPDATE,[])
          }
        }
      }
      if (TableName === TABLE_NAME.LOT) {
        const query = QUERIES.LOT.DELETE;
        for (const data of Response) {
          if (data.Flag === 'D') {
            const params: any = [
              data?.ChildLot,
              data?.ItemId,
              data?.LocatorId,
              data?.LpnId,
              data?.SubInventoryCode
            ];
            await this.database.executeSql(query, params);
          } else {
            await this.insertDataIntoTable(Response, TableName);
            await this.updateQuery(QUERIES.LOT.UPDATE,[])
          }
        }
      };
    } catch (error) {
      console.error(error);
    }
  }
}
