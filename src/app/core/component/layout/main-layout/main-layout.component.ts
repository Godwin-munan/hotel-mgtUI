import { Component, Input } from '@angular/core';
import { UserToken } from 'core/model/user-token';
import { AppRoles } from 'shared/constants/api-constants';
import { AuthService } from 'shared/service/authentication/auth-service.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent { 
  openSidenav = false;
  isAdmin = false;
  isDisplay: boolean = true;
  tokenDetail!: UserToken;

  constructor(public _authService: AuthService){
    this.tokenDetail = this._authService.tokenDetail

    if(this.tokenDetail.scope.includes(AppRoles.ADMIN)){
      this.openSidenav = false;
      this.isAdmin = true;
    }
  }

  toggleSideNav(){
    this.openSidenav = !this.openSidenav
  }

}
