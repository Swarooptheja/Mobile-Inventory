import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent  implements OnInit {
  @Input() searchText:any;
  @Input() placeHolder:any;
  @Output() clearItems = new EventEmitter();
  @Output() searchItems = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  clearsearch() {
    this.clearItems.emit();
  }

  getItems(event:any) {
    this.searchItems.emit(event);
  }

}
