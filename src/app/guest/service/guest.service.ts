import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuestEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private _currentGuestCount$ = new BehaviorSubject<number>(0);

  currentGuestCount$ = this._currentGuestCount$.asObservable();

  constructor(private _apiService: ApiService){ }

  currentGuestCount(){
    this._apiService.get<number>(GuestEndPoints.GET_GUEST_COUNT).subscribe({
      next: response => {
        this._currentGuestCount$.next(response.data)
      },
      error: error => {

      }
    })}
}
