import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input('heading') heading :string = '';
  @Input('isBack') isBack: boolean = false;
  @Input('isHome') isHome: boolean = false;
  @Input('isMenu') isMenu: boolean = false;
  @Input ('isSync') isSync: boolean = false;
  @Input ('isLogOut') isLogOut: boolean = false;
  

  @Output() onNavigateBack = new EventEmitter();
  @Output() onRefresh = new EventEmitter();
  @Output() onLogOut = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  navigateBack () {
    this.onNavigateBack.emit();
  };

  syncData () {
    this.onRefresh.emit();
  };

  logOut () {
    this.onLogOut.emit();
  }

}
