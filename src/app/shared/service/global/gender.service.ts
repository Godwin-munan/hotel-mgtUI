import { Injectable } from '@angular/core';
import { ApiService } from '../api/api-service.service';
import { BehaviorSubject } from 'rxjs';
import { Gender } from 'core/model/gender';
import { GenderEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private _genderList$ = new BehaviorSubject<Gender[]>([])

  
  genderList$ = this._genderList$.asObservable();

  constructor(private _apiService: ApiService) { }

  getGenderList(){
    this._apiService.get<Gender[]>(GenderEndPoints.GET_GENDER).subscribe({
      next: response => {
        this._genderList$.next(response.data); 
      },
      error: error => {

      }
    })
  }
}
