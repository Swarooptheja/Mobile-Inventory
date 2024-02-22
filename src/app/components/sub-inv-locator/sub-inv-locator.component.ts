import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubInvLocatorService } from './sub-inv-locator.service';
import { ERROR_MESSAGE, LOCATOR_TYPE_CODE, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import {ModalController} from '@ionic/angular'
import { CommonModelPage } from '../common-model/common-model.page';
import { Subject } from 'rxjs';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Component({
  selector: 'app-sub-inv-locator',
  templateUrl: './sub-inv-locator.component.html',
  styleUrls: ['./sub-inv-locator.component.scss'],
})
export class SubInvLocatorComponent  implements OnInit {
  @Input() poItem:any
  // @Input() subInventory:any
  // @Input() locator:any;
  // @Input() isSubinvLocEnable:boolean = false;
  isLocatorRestricted:boolean = false;
  isSubInventoryRestricted:boolean = false;
  itemNumber: string = '';
  @Output() onSelectSubInventory = new EventEmitter();
  @Output() onSelectLocator = new EventEmitter();
  handleScanner = new Subject();
  handleScanner$ = this.handleScanner.asObservable();
  defaultSubInv: any;
  defaultLocators: any;
  processValueFor:string = 'SubInventory';
  subInventories:any;
  subInventory: any;
  subInventoryCode:any;
  locator: string ='';
  locatorRespose: any;

  constructor(
    private subInvLocatorService: SubInvLocatorService,
    private modalController: ModalController,
    private uiProvider:UiProviderService
  ) { 
  }
  
  ngOnInit() {
    console.log({
      poIem: this.poItem,
    }, 'poItem');
    this.isSubInventoryRestricted = this.poItem && this.poItem.IsSubinventoryRestricted && this.poItem.IsSubinventoryRestricted.toLowerCase() === 'false' ? false: true;
      this.poItem && this.poItem.IsLocatorRestricted && this.poItem.IsLocatorRestricted.toLowerCase() === 'false' ? false : true;
    this.itemNumber = this.poItem ? this.poItem.ItemNumber : '';
    this.loadSubInvFromLocalDB();
    this.subInventoryCode = this.poItem.DefaultSubInventoryCode;
    if(this.subInventoryCode) {
      this.loadLocatorFromLocalDB();
    }
  }

  async subInventoryModal() {
    let subInvParams: any = {
      type: 'subInventory',
      data: this.subInventories,
      
    };
    // if (this.defaultSubInv) {
    //   subInvParams.defaultSubInv = this.defaultSubInv;
    // };
    const subInvModel = await this.modalController.create({
      component:CommonModelPage,
      componentProps:subInvParams
    });
    subInvModel.present();
    const { data, role } = await subInvModel.onWillDismiss();

    if (role === 'subInventory') {
      this.subInventory = data;
      this.subInventoryCode = data.SubInventoryCode
      // this.locator = data.LocatorTypeCode

    }
    this.loadLocatorFromLocalDB();
  };

  async loadSubInvFromLocalDB () {
    try {
      const subInvResp = await this.subInvLocatorService.getSubInvenoryList(TABLE_NAME.SUBINVENTORY);
      this.subInventories = subInvResp;
    } catch (error) {
      console.log(error);
    }
  }

  async loadLocatorFromLocalDB () {
    try {
      const locatorResp = await this.subInvLocatorService.getLocatorList(this.subInventoryCode);
      if(locatorResp.length ===1) {
        this.locator = locatorResp[0].Locator
      }
      this.locatorRespose = locatorResp;
      console.log(locatorResp,'theja');
    } catch (error) {
      console.log(error)
    }
  }

  async locatorModal() {
    if(!this.subInventoryCode) {
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV);
      return;
    }
    let locatorParams: any = {
      type: 'locators',
      data: this.locatorRespose,
      
    };
    const locatorModel = await this.modalController.create({
      component:CommonModelPage,
      componentProps:locatorParams
    });
    locatorModel.present();
    const { data, role } = await locatorModel.onWillDismiss();

    if (role === 'locators') {
      this.locator = data.Locator

    }
  };

}
