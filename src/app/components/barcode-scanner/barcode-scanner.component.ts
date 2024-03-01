import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent  implements OnInit {
  @Input() placeHolder:any = '';
  @Input() scanText: any = '';
  @Output() scanItem = new EventEmitter();
  constructor() { }

  ngOnInit() {};

  async getItems () {
    await BarcodeScanner.checkPermission({ force: true });
    // if(status.granted) {
      BarcodeScanner.hideBackground();
      
      BarcodeScanner.prepare();
  
      const result = await BarcodeScanner.startScan();
      if(result.hasContent) {
        console.warn(result.content)
        this.scanItem.emit(result.content);
        // await BarcodeScanner.stopScan();
      };

    }

}
