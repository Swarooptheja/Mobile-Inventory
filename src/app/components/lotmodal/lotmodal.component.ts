import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { CommonModelPage } from '../common-model/common-model.page';
import { LotmodalService } from './lotmodal.service';
import { ERROR_MESSAGE } from 'src/app/constants/pages/App-settings';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


// interface LotData<T> {
//   [key: string]: T
// }

// interface localLotData extends LotData<any> {
//   scanLot?: string;
//   quantity?: number;
// }

@Component({
  selector: 'app-lotmodal',
  templateUrl: './lotmodal.component.html',
  styleUrls: ['./lotmodal.component.scss'],
})
export class LotmodalComponent implements OnInit {
  heading: string = '';
  data: any;
  type: any;
  isBack: boolean = true;
  itemNumber: any;
  scanLot: any = '';
  selectedLots: any = [];
  lotList: any;
  quantity: number = 0
  lotQuantity: any;
  inputQuantity: any = '';
  lotData: any = [];
  // lotForm!: FormGroup
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private uiProvider: UiProviderService,
    private lotService: LotmodalService,
    // private formBuilder: FormBuilder
  ) {
    this.data = navParams.get('data');
    this.type = navParams.get('type');
    this.heading = this.data.ItemNumber;
    this.itemNumber = this.data.ItemNumber;
    this.getAllLotData();

  }

  ngOnInit() {
    this.loadLotNumberList()
  };

  getAllLotData() {
    this.lotData.push(this.data)
  }


  goBackToPreviousPage() {
    this.modalController.dismiss()
  };

  async loadLotNumberList() {
    try {
      this.lotList = await this.lotService.lotNumberList(this.itemNumber);
      console.log(this.lotList, 'lotlist')
    } catch (error) {
      console.error(error);

    }
  }

  async lotModal(index: number) {

    const lotParams = {
      type: 'lot',
      data: this.lotList,
    }

    const lotModal = await this.modalController.create({
      component: CommonModelPage,
      componentProps: lotParams
    });
    lotModal.present();

    const { data, role } = await lotModal.onDidDismiss();
     
    if(role === 'lot') {
      this.lotData[index] = {
        ...this.lotData[index],
        ChildLot: data.ChildLot
      };
    };
  };

  confirmLots() {
    this.selectedLots = this.lotData.map((lot:any)=>{
      return ({
        quantity:lot.quantity,
        ChildLot:lot.ChildLot
      })
    })
    this.modalController.dismiss(this.selectedLots, this.type)
  };

  confirmButtonValidation() {
    const totalQuantity = this.lotData.reduce((acc: number, lot: any) => acc + lot.quantity, 0);
    return totalQuantity !== Number(this.data.QTY)
  }

  goToKeypad(event: any, index: number) {
    const value = event.target.value;
    if (!value) {
      return;
    }

    this.lotData[index] = {
      ...this.lotData[index],
      quantity: Number(value)
    }

    const totalQuantity = this.lotData.reduce((acc: any, lot: any) => acc + Number(lot.quantity), 0);

    if (totalQuantity > Number(this.data.QTY)) {
      this.uiProvider.showError(ERROR_MESSAGE.SELECTED_QTY_SHOULD_BE);
      this.lotData[index] = {
        ...this.lotData[index],
        inputQuantity: '',
        quantity:0
      }
      return
    };
  }

  onChangeSelectLot(event: any, index: number) {
    const value = event.target.value;
    if (!value) {
      return;
    }
    if (!this.lotList.length) {
      this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_LOT);
      return;
    };

    const validLots = this.lotList.find((lot: any) => lot.ChildLot === value);
    if (!validLots) {
      this.lotData[index] = {
        ...this.lotData[index],
        ChildLot:''
      };
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_VALID_LOT);
      return;
    };
    this.lotData[index] = {
      ...this.lotData[index],
      ChildLot: validLots.ChildLot
    };
  }

  isValidAddItem() {
    const totalQuantity = this.lotData.reduce((acc: number, lot: any) => acc + lot.quantity, 0);
    return Number(this.data.QTY) <= totalQuantity;
  }
  addLot() {
    const index = this.lotData.findIndex((el: any)=>{
      return el.inputQuantity === '' || el.ChildLot === ''
    })
    if(index > -1) {
      this.uiProvider.showError (ERROR_MESSAGE.PLEASE_SELECT_LOT_AND_ENTER_QTY);
      return 
    }; 
    this.lotData.push({
      ...this.data,
      inputQuantity: ''
    })
  }

}
