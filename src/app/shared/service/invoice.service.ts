import { Injectable } from '@angular/core';
import { ApiService } from './api/api-service.service';
import { Invoice } from 'core/model/invoice';
import { InvoiceEndPoints } from 'shared/constants/api-constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private _invoice$ = new BehaviorSubject<Partial<Invoice>>({});
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  invoice$ = this._invoice$.asObservable();
  isLoading$ = this._isLoading$.asObservable();

  constructor(private _apiService: ApiService) { }

  addInvoice(data: any){

    this._apiService.add<Invoice>(InvoiceEndPoints.ADD_INV, data).subscribe({
      next: response => {
        this._invoice$.next(response.data);
      },
      error: error => {}
    });
  }

  getInvoice(id: number){
    this._apiService.getById<Invoice>(id, InvoiceEndPoints.GET_INV_ID).subscribe({
      next: response => {
        this._invoice$.next(response.data);
      },
      error: error => {}
    });
  }

  getInvoiceByGuest(id: number){
    this._isLoading$.next(true);

    this._apiService.getById<Invoice>(id, InvoiceEndPoints.GET_INV_GUEST_ID).subscribe({
      next: response => {
        this._invoice$.next(response.data);
        this._isLoading$.next(false);
      },
      error: error => {
        this._isLoading$.next(false);
      }
    });
  }
}
