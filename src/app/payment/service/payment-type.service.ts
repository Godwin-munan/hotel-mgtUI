import { Injectable } from '@angular/core';
import { PaymentMethod } from 'core/model/payment-method';
import { BehaviorSubject } from 'rxjs';
import { PayMethodEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  private _PaymentMethodList$ = new BehaviorSubject<PaymentMethod[]>([])

  PaymentMethodList$ = this._PaymentMethodList$.asObservable();

  constructor(private _apiService: ApiService) { }

  getPaymentTypeList(){
    this._apiService.get<PaymentMethod[]>(PayMethodEndPoints.GET_METHOD).subscribe({
      next: response => {
        this._PaymentMethodList$.next(response.data); 
        localStorage.setItem('payment-method', JSON.stringify(response.data));
      },
      error: error => {

      }
    })
  }

  paymentMethodStorageState(state: boolean){
    if(!state) return;
    let paymentMethod  = this.paymentMethodFromStorage;
    this._PaymentMethodList$.next(JSON.parse(paymentMethod) as PaymentMethod[]);
  }

  findStoragePaymentMethodById(id: number): PaymentMethod{
    let paymentMethod  = this.paymentMethodFromStorage;
    let _paymentMethod = (JSON.parse(paymentMethod) as PaymentMethod[]).find((paymentMethod: PaymentMethod ) => paymentMethod.id === id);
    return _paymentMethod as PaymentMethod;
  }

  get paymentMethodFromStorage(): string{
    return localStorage.getItem('payment-method') as string;
  }
}
