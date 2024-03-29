import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api/api-service.service';
import { BehaviorSubject, Observable, map,} from 'rxjs';
import { Tokens } from 'core/model/tokens';
import { AuthEndPoints } from 'shared/constants/api-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from 'core/model/user-token';
import { Router } from '@angular/router';
import { GenderService } from '../global/gender.service';
import { JobService } from '../global/job.service';
import { ShiftService } from '../global/shift.service';
import { IdCardService } from '../global/id-card.service';
import { RoleService } from '../global/role.service';
import { RoomTypeService } from 'room/service/room-type.service';
import { PaymentTypeService } from 'payment/service/payment-type.service';
import { LoginInfo } from 'core/model/login-info';
import { HttpResponse } from 'core/utils/http-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly ACCESS_TOKEN = 'access_token';

  private _isLogin$ =  new BehaviorSubject<boolean>(false);
  private _errorStatus$ = new BehaviorSubject<boolean>(false);
  private _tokenDetail$ = new BehaviorSubject<Partial<UserToken>>({});
  private _isLoading$ = new BehaviorSubject<boolean>(false);


  isLogin$ = this._isLogin$.asObservable();
  errorStatus$ = this._errorStatus$.asObservable();
  tokenDetail$ = this._tokenDetail$.asObservable();
  isLoading$ = this._isLoading$.asObservable();

  constructor(
    private _apiService: ApiService,
    private _genderService: GenderService,
    private _jobService: JobService,
    private _shiftService: ShiftService,
    private _idCardService: IdCardService,
    private _roleService: RoleService,
    private _jwtHelper: JwtHelperService,
    private _roomTypeService: RoomTypeService,
    private _paymentTypeService: PaymentTypeService,
    private _router: Router
    ) { 
    const token = this.getToken;
    this._isLogin$.next(!this.isLogIn(token));

    this._tokenDetail$.next(this.tokenDetail);

    this.storageState()

  }

  signIn(credential: LoginInfo)  : Observable<Tokens> { return this._apiService.add<Tokens>(AuthEndPoints.LOGIN, {
      username: credential.username,
      password: credential.password
    }).pipe(map(res => res.data as Tokens )) }

  //Get token for login
  login(username: string, password: string){
    this._isLoading$.next(true);

    this._apiService.add<Tokens>(AuthEndPoints.LOGIN, {
      username: username,
      password: password
    })
    .subscribe({
      next: response => {

        let token = response.data.access_token;

        this._isLogin$.next(true);
        this._errorStatus$.next(false);
        localStorage.setItem(this.ACCESS_TOKEN, token);

        this._router.navigate(['']);
        
        //Get gender list 
        this._genderService.getGenderList();

        //Get job list
        this._jobService.getJobList();

        //Get shift list
        this._shiftService.getShiftList();

        //Get Id-card list
        this._idCardService.getIdCardList();
        
      //Get role list
      this._roleService.getRoleList();

      //Get room type list
      this._roomTypeService.getRoomTypeList();

      //Get payment type list
      this._paymentTypeService.getPaymentTypeList();

      this._isLoading$.next(false);
      
    },
    error: error => {
      this._errorStatus$.next(true);
      this._isLoading$.next(false);
    }
    })
    
  }

  //Remove token after logout
  logout(){
    let token = this.getToken
    if(!token) return;

    this.removeStorageState();
    this._isLogin$.next(false);

    this._router.navigate(['/login']);

  }

  //check validity of token
  private isLogIn(token: any){
    let isExpired = true;
  
    if(!token) return true;

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if(isExpired) {
      localStorage.removeItem(this.ACCESS_TOKEN);
      this.removeStorageState();
    }

    return isExpired;
  }

  //get token detail from decoded jwt
  get tokenDetail(): UserToken{
    return this._jwtHelper.decodeToken() as UserToken
  }

  //get token from local storage
  get getToken(): string{
    return localStorage.getItem(this.ACCESS_TOKEN) as string;
  }

  storageState(){
    localStorage.getItem('shift') ? this._shiftService.shiftStorageState(true) : this._shiftService.shiftStorageState(false);
    localStorage.getItem('job') ? this._jobService.jobStorageState(true) : this._jobService.jobStorageState(false);
    localStorage.getItem('card') ? this._idCardService.cardStorageState(true) : this._idCardService.cardStorageState(false);
    localStorage.getItem('gender') ? this._genderService.genderStorageState(true) : this._genderService.genderStorageState(false);
    localStorage.getItem('role') ? this._roleService.roleStorageState(true) : this._roleService.roleStorageState(false);
    localStorage.getItem('room-type') ? this._roomTypeService.roomTypeStorageState(true) : this._roomTypeService.roomTypeStorageState(false);
    localStorage.getItem('payment-method') ? this._paymentTypeService.paymentMethodStorageState(true) : this._paymentTypeService.paymentMethodStorageState(false);
  }
  
  removeStorageState(){
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem('card');
    localStorage.removeItem('job');
    localStorage.removeItem('shift');
    localStorage.removeItem('gender');
    localStorage.removeItem('role');
    localStorage.removeItem('room-type');
    localStorage.removeItem('payment-method');
  }

}
