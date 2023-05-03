import { Injectable } from '@angular/core';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { BehaviorSubject } from 'rxjs';
import { PayEndPoints } from 'shared/constants/api-constants';
import { ErrorState } from 'shared/error-state';
import { ApiService } from 'shared/service/api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _paymentList$ = new BehaviorSubject<Payment[]>([]);
  private _invoice$ = new BehaviorSubject<Partial<Invoice>>({});
  private _inLoading$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<Partial<ErrorState>>({});

  paymentList$ = this._paymentList$.asObservable();
  invoice$ = this._invoice$.asObservable();
  inLoading$ = this._inLoading$.asObservable();
  error$ = this._error$.asObservable();

  errorMsg!: string;



  constructor(
    private _apiService: ApiService,
  ) {}

  addPayment(payment: any){
    return this._apiService.add<Payment>(PayEndPoints.ADD_PAY, payment);
  }

  private getByCodeAndSubscribe(code: string, api: string){
    this.clearPaymentState();
    this._inLoading$.next(true);

    this._apiService.getByCode<Payment[]>(code, api).subscribe({
      next: response => {
        this._paymentList$.next(response.data);

        this._invoice$.next(response.data[0].invoice)

        this._inLoading$.next(false);
      },
      error: error => {
        this._error$.next({
          state: true,
          msg: ''
        })
        
        if(error.originalError.status === 400){
          this._error$.next({
            state: true,
            msg: 'Invalid code or email'
          })
        }
        this._inLoading$.next(false);
      }
  });
  }

  getPaymentListByInvoiceCode(code: string){
    return this._apiService.getByCode<Payment[]>(code, PayEndPoints.GET_PAY_INV_CODE);
  }

  getPaymentListByGuestCode(code: string){
    this.getByCodeAndSubscribe(code, PayEndPoints.GET_PAY_GUEST_CODE);
  }

  getPaymentListByGuestEmail(email: string){
    this.getByCodeAndSubscribe(email, PayEndPoints.GET_PAY_GUEST_EMAIL);
  }

  updatePayment(payment: Payment){
    return this._apiService.update<Payment>(PayEndPoints.PUT_PAY, payment);
  }

  deletePayment(id: number){
    return this._apiService.delete(PayEndPoints.REMOVE_PAY, id);
  }

  clearPaymentState(){
    this._invoice$.next({});
    this._paymentList$.next([]);
    this._error$.next({});
  }
}
