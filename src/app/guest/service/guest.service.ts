import { Injectable } from '@angular/core';
import { Guest } from 'core/model/guest';
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

  addGuest(guest: any){
    return this._apiService.add<Guest>(GuestEndPoints.ADD_GUEST, guest);
  }

  addRoomsToGuest(id: number, rooms: any){
    return this._apiService.addById<Guest>(GuestEndPoints.ADD_ROOMLIST_GUEST_ID, id, rooms);
  }

  currentGuestCount(){
    this._apiService.get<number>(GuestEndPoints.GET_GUEST_COUNT).subscribe({
      next: response => {
        this._currentGuestCount$.next(response.data)
      },
      error: error => {

      }
    })}


    getAvailableGuest(){
      return this._apiService.get<Guest[]>(GuestEndPoints.GET_GUEST_CURRENT);
    }

    checkOutGuest(data: any){
      return this._apiService.add<Guest>(GuestEndPoints.CHECKOUT_GUEST, data);
    }

}
