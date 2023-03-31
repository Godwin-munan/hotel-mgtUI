import { Injectable } from '@angular/core';
import { ApiServiceService } from '../api/api-service.service';
import { BehaviorSubject } from 'rxjs';
import { Tokens } from 'core/model/tokens';
import { AuthEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _token$ =  new BehaviorSubject<string>('');
  token$ = this._token$.asObservable();

  constructor(private _apiService: ApiServiceService) { 

  }

  getToken(username: string, password: string){
    this._apiService.add<Tokens>(AuthEndPoints.LOGIN, {
      username: username,
      password: password
    }).subscribe({
      next: reponse => {
        let token = reponse.data.access_token;
        this._token$.next(token);
        localStorage.setItem('token', token);
      },
      error: error => console.log('ERROR: ' + error?.message 
      )
    })
  }


}
