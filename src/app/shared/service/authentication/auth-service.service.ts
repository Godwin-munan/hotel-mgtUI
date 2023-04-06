import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api/api-service.service';
import { BehaviorSubject, pipe, tap } from 'rxjs';
import { Tokens } from 'core/model/tokens';
import { AuthEndPoints, GenderEndPoints } from 'shared/constants/api-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from 'core/model/user-token';
import { Router } from '@angular/router';
import { GenderService } from '../global/gender.service';
import { JobService } from '../global/job.service';
import { ShiftService } from '../global/shift.service';
import { IdCardService } from '../global/id-card.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {


  private readonly ACCESS_TOKEN = 'access_token'

  private _isLogin$ =  new BehaviorSubject<boolean>(false);
  private _errorStatus$ = new BehaviorSubject<boolean>(false)
  private _tokenDetail$ = new BehaviorSubject<Partial<UserToken>>({});


  isLogin$ = this._isLogin$.asObservable();
  errorStatus$ = this._errorStatus$.asObservable();
  tokenDetail$ = this._tokenDetail$.asObservable();

  constructor(
    private _apiService: ApiService,
    private _genderService: GenderService,
    private _jobService: JobService,
    private _shiftService: ShiftService,
    private _idCardService: IdCardService,
    private _jwtHelper: JwtHelperService,
    private _router: Router
    ) { 
    const token = this.getToken;
    this._isLogin$.next(!this.isLogIn(token));

    this._tokenDetail$.next(this.tokenDetail);

  }
  ngOnInit() {
    
  }

  //Get token for login
  login(username: string, password: string){

    this._apiService.add<Tokens>(AuthEndPoints.LOGIN, {
      username: username,
      password: password
    }).subscribe({
      next: response => {
      let token = response.data.access_token;
        this._isLogin$.next(true);
        this._errorStatus$.next(false)
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

    },
    error: error => {
      this._errorStatus$.next(true);
    }
    })
    
  }

  //Remove token after logout
  logout(){
    let token = this.getToken
    if(!token) return;

    localStorage.removeItem(this.ACCESS_TOKEN);
    this._isLogin$.next(false);

    this._router.navigate(['/login']);

  }

  //check validity of token
  private isLogIn(token: any){
    let isExpired = true;
  
    if(!token) return true;

    isExpired = this._jwtHelper.isTokenExpired(token).valueOf() as boolean;

    if(isExpired) localStorage.removeItem(this.ACCESS_TOKEN)

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

  

}
