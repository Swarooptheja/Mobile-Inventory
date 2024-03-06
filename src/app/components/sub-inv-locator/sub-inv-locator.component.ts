import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubInvLocatorService } from './sub-inv-locator.service';
import { ERROR_MESSAGE, LOCATOR_TYPE_CODE, TABLE_NAME } from 'src/app/constants/pages/App-settings';
import { ModalController } from '@ionic/angular'
import { CommonModelPage } from '../common-model/common-model.page';
import { Subject } from 'rxjs';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';

@Component({
  selector: 'app-sub-inv-locator',
  templateUrl: './sub-inv-locator.component.html',
  styleUrls: ['./sub-inv-locator.component.scss'],
})
export class SubInvLocatorComponent implements OnInit {
  @Input() poItem: any
  isLocatorRestricted: boolean = false;
  isSubInventoryRestricted: boolean = false;
  itemNumber: string = '';
  @Output() onSelectSubInventory = new EventEmitter();
  @Output() onSelectLocator = new EventEmitter();
  handleScanner = new Subject();
  handleScanner$ = this.handleScanner.asObservable();
  defaultSubInv: any;
  defaultLocators: any;
  subInventories: any;
  subInventory: any;
  subInventoryCode: any;
  locator: string = '';
  locatorRespose: any;

  constructor(
    private subInvLocatorService: SubInvLocatorService,
    private modalController: ModalController,
    private uiProvider: UiProviderService
  ) {
    this.isSubInventoryRestricted = this.poItem && this.poItem.IsSubinventoryRestricted && this.poItem.IsSubinventoryRestricted.toLowerCase() === 'false' ? false : true;
    this.poItem && this.poItem.IsLocatorRestricted && this.poItem.IsLocatorRestricted.toLowerCase() === 'false' ? false : true;
    this.itemNumber = this.poItem ? this.poItem.ItemNumber : '';
    this.loadSubInvFromLocalDB();
    this.subInventoryCode = this.poItem?.DefaultSubInventoryCode;
  }
  
  ngOnInit() {
    if (this.subInventoryCode) {
      this.loadLocatorFromLocalDB();
      this.emitSubInventory(this.subInventoryCode);
    }
  }

  onChangeSubInventory(event: any) {
    try {
      const value = event.target.value;
      if (!this.subInventories.length) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_SUB_INV);
        this.subInventoryCode = '';
        return;
      };
      const validSubInv = this.subInventories.find((subInv: any) => subInv.SubInventoryCode === value);
      if (!validSubInv) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_VALID_SUB_INV);
        this.subInventoryCode = '';
        return;
      }
      this.emitSubInventory(validSubInv.subInventoryCode);
      this.locator = '';
      this.loadLocatorFromLocalDB();

    } catch (error) {
      console.error(error);

    }

  };

  scanSubInventory (event: any) {
    try {
      if (!this.subInventories.length) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_SUB_INV);
        this.subInventoryCode = '';
        return;
      };
      const validSubInv = this.subInventories.find((subInv: any) => subInv.SubInventoryCode === event);
      if (!validSubInv) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_VALID_SUB_INV);
        this.subInventoryCode = '';
        return;
      }
      this.emitSubInventory(validSubInv.subInventoryCode);
      this.locator = ''
      this.loadLocatorFromLocalDB();

    } catch (error) {
      console.error(error);
    }
  }

  onChangeLocator(event: any) {
    try {
      const value = event.target.value;
      if (!this.subInventoryCode) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV);
        this.locator = ''
        return;
      }
      if (!this.locatorRespose.length) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_LOCATORS);
        this.locator = '';
        return
      };
      const validLocator = this.locatorRespose.find((locator: any) => locator.Locator === value);
      if (!validLocator) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_VALID_LOCATOR);
        this.locator = '';
        return
      }
      this.emitLocator(validLocator.Locator)
    } catch (error) {
      console.error(error);
    }
  }
  scanLocator(event: any) {
    try {
      if (!this.subInventoryCode) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV);
        this.locator = ''
        return;
      }
      if (!this.locatorRespose.length) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_LOCATORS);
        this.locator = '';
        return
      };
      const validLocator = this.locatorRespose.find((locator: any) => locator.Locator === event);
      if (!validLocator) {
        this.uiProvider.showError(ERROR_MESSAGE.NOT_VALID_LOCATOR);
        this.locator = '';
        return
      }
      this.emitLocator(validLocator.Locator);
    } catch (error) {
      console.error(error);
    }
  }

  async subInventoryModal() {
    let subInvParams: any = {
      type: 'subInventory',
      data: this.subInventories,

    };
    const subInvModel = await this.modalController.create({
      component: CommonModelPage,
      componentProps: subInvParams
    });
    subInvModel.present();
    const { data, role } = await subInvModel.onWillDismiss();

    if (role === 'subInventory') {
      this.subInventory = data;
      this.subInventoryCode = data.SubInventoryCode

      this.emitSubInventory(this.subInventoryCode);

    }
    this.locator = '';
    this.loadLocatorFromLocalDB();

  };

  async loadSubInvFromLocalDB() {
    try {
      const subInvResp = await this.subInvLocatorService.getSubInvenoryList(TABLE_NAME.SUBINVENTORY);
      this.subInventories = subInvResp;
    } catch (error) {
      console.error(error);
    }
  }

  async loadLocatorFromLocalDB() {
    try {
      const locatorResp = await this.subInvLocatorService.getLocatorList(this.subInventoryCode);
      if (locatorResp.length === 1) {
        this.locator = locatorResp[0].Locator
      }
      this.locatorRespose = locatorResp;
      if(!this.locatorRespose.length) {
        this.locator = 'N/A';
      };
    } catch (error) {
      console.error(error)
    }
  }

  async locatorModal() {
    if (!this.subInventoryCode) {
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_SUBINV);
      return;
    }
    let locatorParams: any = {
      type: 'locators',
      data: this.locatorRespose,

    };
    const locatorModel = await this.modalController.create({
      component: CommonModelPage,
      componentProps: locatorParams
    });
    locatorModel.present();
    const { data, role } = await locatorModel.onWillDismiss();

    if (role === 'locators') {
      this.locator = data.Locator
      this.emitLocator(this.locator)
    }
  };

  emitSubInventory(subInventory: any) {
    this.onSelectSubInventory.emit({
      ...this.poItem,
      subInventory
    })
  };

  emitLocator(locator: any) {
    this.onSelectLocator.emit({
      ...this.poItem,
      locator
    })
  }

  shouldDisplayLocatorModal () {
    return this.subInventories?.length && this.locatorRespose?.length
  }
}
