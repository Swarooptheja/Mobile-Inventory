import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ERROR_MESSAGE, ROUTE_PATHS, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import { GlobalvariablesService } from 'src/app/providers/globalvariables/globalvariables.service';
import { OfflineDataService } from 'src/app/providers/offline/offline-data.service';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Component({
  selector: 'app-all-user-organization-list',
  templateUrl: './all-user-organization-list.page.html',
  styleUrls: ['./all-user-organization-list.page.scss'],
})
export class AllUserOrganizationListPage implements OnInit {
  userDetails: any;
  heading:string = 'Select Organization';
  organizationList:any;
  selectedOrgCode:string = '';
  isBack:boolean = false;
  selectOrgId:any;
  searchText:any;
  constructor(
    private navCtrl: NavController,
    private offlineDataService: OfflineDataService,
    private storage: Storage,
    private globalvars: GlobalvariablesService,
    private uiProvider: UiProviderService
  ) {
    this.getAllUserOrganization();
  }

  onPullRefresh(event: any) {
    setTimeout(() => {
      this.getAllUserOrganization();
      event.target.complete();
    }, 3000);

  };

  async getAllUserOrganization () {
    this.userDetails = await this.storage.get('userDetails');
    let query = `SELECT * FROM ${TABLE_NAME.INVENTORY_ORG_LIST} ORDER BY InventoryOrgCode`;
    this.organizationList = await this.offlineDataService.executeQueryWithoutParams(query);
  }

  ngOnInit() {

  }

  clearSearchItem () {
    this.searchText = ''
  };

  getsearchItems (event:any) {
    this.searchText = event.target.value;
  }

  goBackToPreviousPage() {
    this.navCtrl.navigateBack(ROUTE_PATHS.LOGIN)
  }

  selectOrg (item:any) {
    this.organizationList.forEach((element:any) => {
      element.checked = false;
    });
    this.selectedOrgCode = item.InventoryOrgCode;
    item.checked = true;
    this.selectOrgId = item;
  }

 async confirmOrganization () {
    if(!this.userDetails || this.userDetails.length < 0) {
      return
    };

    if(!this.selectOrgId) {
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_ORGANIZATION);
      return;
    };

    this.globalvars.setInvOrgId(this.selectOrgId.InventoryOrgId);
    this.globalvars.setInvOrgCode(this.selectOrgId.InventoryOrgCode);
    this.storage.set('inventoryOrgCode', this.selectOrgId.InventoryOrgCode);
    this.storage.set('invOrgId', this.selectOrgId.InventoryOrgId);

    for (let i=0; i<this.userDetails.length; i++) {
      if ((this.userDetails[i].DEFAULT_ORG_ID !== "") && (this.userDetails[i].DEFAULT_OU_NAME !== "")) {
        this.globalvars.setOrgId(this.userDetails[i].DEFAULT_ORG_ID);
        this.globalvars.setOrganisationname(this.userDetails[i].DEFAULT_OU_NAME);
        break
      };
      
    };

    this.globalvars.setAllUserOrganization(true);
    this.navCtrl.navigateForward(ROUTE_PATHS.ACTIVITY);
    
  }



}
