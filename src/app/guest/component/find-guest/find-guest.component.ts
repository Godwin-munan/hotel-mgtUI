import { Component, OnDestroy } from '@angular/core';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { PaymentService } from 'payment/service/payment.service';
import { Observable, Subject } from 'rxjs';
import { ErrorState } from 'shared/error-state';

@Component({
  selector: 'find-guest',
  templateUrl: './find-guest.component.html',
  styleUrls: ['./find-guest.component.scss']
})
export class FindGuestComponent implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();


  paymentList$!: Observable<Payment[]>;
  invoice$!: Observable<Partial<Invoice>>;
  inLoading$!: Observable<boolean>;
  error$!: Observable<Partial<ErrorState>>

  code: string = '';
  email: string = ''
  isCode: boolean = true;

  constructor(private _paymentService: PaymentService){}


  ngOnDestroy(){
    this.destroySubject.next();
  }

  onCode(){
    this.isCode = true;
  }

  onEmail(){
    this.isCode = false;
  }

  private assignState(){
    this.paymentList$ = this._paymentService.paymentList$;
    this.invoice$ = this._paymentService.invoice$;
    this.error$ = this._paymentService.error$;
    this.inLoading$ = this._paymentService.inLoading$;
  }

  updatePage(event: any){
    this.getWithEmail(event.event)
  }

  getWithEmail(email: string){
    this._paymentService.clearPaymentState();
    this._paymentService.getPaymentListByGuestEmail(email);
    this.assignState();
  }

  submitSearch(){
    if(this.isCode && this.code !== ''){
      this._paymentService.clearPaymentState();
      this._paymentService.getPaymentListByGuestCode(this.code);
      this.assignState();
      this.code = '';
    }else if(!this.isCode && this.email !== ''){
      this.getWithEmail(this.email);
      this.email = '';
    }else return

  }

}
