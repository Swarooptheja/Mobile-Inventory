import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ERROR_MESSAGE } from 'src/app/constants/pages/App-settings';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { LotmodalComponent } from '../lotmodal/lotmodal.component';

@Component({
  selector: 'app-lot-number',
  templateUrl: './lot-number.component.html',
  styleUrls: ['./lot-number.component.scss'],
})
export class LotNumberComponent  implements OnInit {
  @Input() poItem:any;
  @Output () onSelectLots = new EventEmitter();

  selectedLots:any;
  isBack:boolean = true
  constructor(
    private modalController: ModalController,
    private uiProvider:UiProviderService
  ) { }

  ngOnInit() {}

  async LotModal () {
    try {
      if(!this.poItem.QTY) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_QTY)
        return;
      };
      const lotsParams = {
        type: 'lot',
        data: this.poItem
      };
      const lotModal = await this.modalController.create({
        component: LotmodalComponent,
        componentProps: lotsParams
      });

      lotModal.present();
      const {data, role} = await lotModal.onWillDismiss();

      if(role === 'lot') {
        this.selectedLots = data;
       this.emitLots(data)
      }

    } catch (error) {
      console.error(error);
    }
  };

  emitLots (data:any) {
    this.onSelectLots.emit({
      ...this.poItem,
      selectedLots: data
    })
  }

}
