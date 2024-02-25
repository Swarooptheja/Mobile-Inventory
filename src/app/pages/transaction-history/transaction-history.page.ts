import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ROUTE_PATHS } from 'src/app/constants/pages/App-settings';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {
  heading: string = 'Transaction History';
  isBack: boolean = true;
  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBackToPreviousPage () {
    this.navCtrl.navigateBack(ROUTE_PATHS.DASH_BOARD)
  }

}
