import { Injectable, OnDestroy } from '@angular/core';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { PayEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _paymentList$ = new BehaviorSubject<Payment[]>([]);
  private _invoice$ = new BehaviorSubject<Partial<Invoice>>({});

  paymentList$ = this._paymentList$.asObservable();
  invoice$ = this._invoice$.asObservable();

  errorMsg!: string;



  constructor(
    private _apiService: ApiService,
  ) {}

  getPaymentListByCode(code: string){
    return this._apiService.getByCode<Payment[]>(code, PayEndPoints.GET_PAY_INV_CODE)
  }

  updatePayment(payment: Payment){
    return this._apiService.update<Payment>(PayEndPoints.PUT_PAY, payment)
  }

  deletePayment(id: number){
    return this._apiService.delete(PayEndPoints.REMOVE_PAY, id)
  }
}
