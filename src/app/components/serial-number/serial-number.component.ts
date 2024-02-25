import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SerialmodalComponent } from '../serialmodal/serialmodal.component';
import { UiProviderService } from 'src/app/providers/ui/ui-provider.service';
import { ERROR_MESSAGE } from 'src/app/constants/pages/App-settings';

@Component({
  selector: 'app-serial-number',
  templateUrl: './serial-number.component.html',
  styleUrls: ['./serial-number.component.scss'],
})
export class SerialNumberComponent  implements OnInit {
  @Input() poItem :any;
  @Output() onSelectSerials = new EventEmitter();

  selectedSerials:any;
  constructor(
    private modalController: ModalController,
    private uiProvider:UiProviderService
  ) { }

  ngOnInit() {}

  async serialModal () {
    try {
      if(!this.poItem.QTY) {
        this.uiProvider.showError(ERROR_MESSAGE.PLEASE_SELECT_QTY)
        return;
      }
      const serialsParams = {
        type: 'serial',
        data: this.poItem
      }
      const serialModal = await this.modalController.create({
        component: SerialmodalComponent,
        componentProps: serialsParams
      });
      serialModal.present();
      const {data, role} = await serialModal.onDidDismiss();

      if(role === 'serial') {
        this.selectedSerials = data;
        this.emitSerials (this.selectedSerials);
        console.log(this.selectedSerials, "thjea")
      }
    } catch (error) {
      console.error(error);     
    }
  }

  emitSerials (selectedSerials:any) {
    this.onSelectSerials.emit({
      ...this.poItem,
      selectedSerials
    })
  }

}
