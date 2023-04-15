import { Injectable } from '@angular/core';
import { AppUserEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';
import { AppUser } from 'core/model/app-user';
import { AuthService } from 'shared/service/authentication/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  
  constructor(
    private _apiService: ApiService,
    private _authService: AuthService,
  ) { }

  getUserList(){
    return this._apiService.get<AppUser[]>(AppUserEndPoints.GET_USER);
  }

  get tokenDetail(){
    return this._authService.tokenDetail;
  }

  addUser(value: any) {
    return this._apiService.add<AppUser>(AppUserEndPoints.ADD_USER, value);
  }


  updateUser(user: AppUser){
    return this._apiService.update<AppUser>(AppUserEndPoints.PUT_USER, user)
  }

  deleteUser(id: number){
    return this._apiService.delete(AppUserEndPoints.DELETE_USER, id)
  }

}
