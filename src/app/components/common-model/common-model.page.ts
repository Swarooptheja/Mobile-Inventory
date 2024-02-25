import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ROUTE_PATHS } from 'src/app/constants/pages/App-settings';

@Component({
  selector: 'app-common-model',
  templateUrl: './common-model.page.html',
  styleUrls: ['./common-model.page.scss'],
})
export class CommonModelPage implements OnInit {

  // heading:string = 'SubInventories';
  isBack:boolean = true;
  subInventories: any;
  searchText:any;
  subInventoryCode: any;
  selectedItem:any;
  type:any;
  locator: any;
  data: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.type = navParams.get('type');
    this.data = navParams.get('data')
   }

  ngOnInit() {
    console.log(this.subInventories,"theja")
  }

  clearSearchItem () {
    this.searchText = ''
  };

  getsearchItems (event:any) {
    this.searchText = event.target.value;
  };

  selectSubInv (item:any) {
    this.selectedItem = item;
    return this.modalController.dismiss(this.selectedItem, this.type)
  };

  goBackToPreviousPage () {
    this.modalController.dismiss()
  }

}
