import { Component, Input, OnInit } from '@angular/core';
import { SidenavData } from './sidenav-data';
import { UserToken } from 'core/model/user-token';

@Component({
  selector: 'core-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input('tokenDetail') tokenDetail!: UserToken;
  sideData = SidenavData;

}
