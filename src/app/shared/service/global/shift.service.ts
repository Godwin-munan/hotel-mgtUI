import { Injectable } from '@angular/core';
import { Shift } from 'core/model/shift';
import { BehaviorSubject } from 'rxjs';
import { ShiftEndPoints } from 'shared/constants/api-constants';
import { ApiService } from '../api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private _shiftList$ = new BehaviorSubject<Shift[]>([])

  
  shiftList$ = this._shiftList$.asObservable();

  constructor(private _apiService: ApiService) { }

  getShiftList(){
    this._apiService.get<Shift[]>(ShiftEndPoints.GET_SHIFT).subscribe({
      next: response => {
        this._shiftList$.next(response.data); 
      },
      error: error => {

      }
    })
  }
}
