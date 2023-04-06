import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { UserToken } from 'core/model/user-token';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'shared/service/authentication/auth-service.service';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{
  @Input('isAdmin') isAdmin = false;
  @Output('toggleSidnav') toggleSidnav = new EventEmitter();

  isLogin$!: Observable<boolean>;
  login = true;
  subscription$!: Subscription;

  constructor(public _authService: AuthService){
  }

  logout(){
    this._authService.logout();
    this.isLogin$ = this._authService.isLogin$

}

toggleNav(){
  this.toggleSidnav.emit();
}

ngOnDestroy(){
  // this.subscription$.unsubscribe();
  
}

}
