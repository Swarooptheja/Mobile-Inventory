import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController, NavParams } from '@ionic/angular';
import { SerialmodalService } from './serialmodal.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { ERROR_MESSAGE } from 'src/app/constants/pages/App-settings';

@Component({
  selector: 'app-serialmodal',
  templateUrl: './serialmodal.component.html',
  styleUrls: ['./serialmodal.component.scss'],
})
export class SerialmodalComponent implements OnInit {
  heading: string = '';
  data: any;
  type: any;
  isBack: boolean = true;
  itemNumber: any;
  serialList: any = [];
  scanSerial: any;
  searchTermChanged = new Subject();
  validSerials: any = [];
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private serialmodalservice: SerialmodalService,
    private uiProvider: UiProviderService
  ) {
    this.data = navParams.get('data');
    this.type = navParams.get('type');
    this.heading = this.data.ItemNumber;
    this.itemNumber = this.data.ItemNumber;

  }

  ngOnInit() {
    this.loadSerialNumberList()
  };

  async loadSerialNumberList() {
    try {
      this.serialList = await this.serialmodalservice.SerialNumberList(this.itemNumber);
      console.log(this.serialList, 'swarooop')
    } catch (error) {
      console.error(error);

    }
  }


  onSearchTermChange(event: any) {
    const value = event.target.value;
    if (!value) {
      return;
    }
    if (!this.serialList.length) {
      this.scanSerial = '';
      this.uiProvider.showError(ERROR_MESSAGE.NOT_AVAILABLE_SERIALS);
      return;
    };
    if (this.validSerials.length === Number(this.data.QTY)) {
      this.scanSerial = '';
      this.uiProvider.showError(ERROR_MESSAGE.TOTAL_SERIALS_SHOULD_BE);
      return;
    }
    const validSerials = this.serialList.find((serial: any) => serial.SerialNumber === value);
    if (!validSerials) {
      this.scanSerial = '';
      this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_VALID_SERIALS);
      return;
    };
    this.validSerials.push(validSerials);
    this.scanSerial = '';
  }


  goBackToPreviousPage() {
    this.modalController.dismiss()
  }

  onDeleteSerial(indexofValidSerial: any) {
    this.validSerials.splice(indexofValidSerial, 1)
  }

  confirmOrganization() {
    return this.modalController.dismiss(this.validSerials, this.type);
  }

  confirmButtonValidation(): boolean {
    return this.validSerials.length !== Number(this.data.QTY);
  }

}
