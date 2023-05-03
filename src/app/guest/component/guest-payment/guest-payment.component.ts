import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'core/model/invoice';
import { PaymentMethod } from 'core/model/payment-method';
import { PaymentService } from 'payment/service/payment.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'guest-payment',
  templateUrl: './guest-payment.component.html',
  styleUrls: ['./guest-payment.component.scss']
})
export class GuestPaymentComponent implements OnDestroy {
  private destroySubject: Subject<void> = new Subject();
  
  @Input('invoice$') invoice$!: Observable<Partial<Invoice>>;
  @Input('PaymentMethodList$') PaymentMethodList$!: Observable<PaymentMethod[]>
  @Output('addPayment') addPayment = new EventEmitter();
  guestPaymentForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _paymentService: PaymentService,
    ){

    this.guestPaymentForm = this._fb.group({
      amount: ['', [Validators.required]],
      date:['',[Validators.required]],
      paymentMethodId: ['',[Validators.required]]
      
    })
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onFormSubmit(invoiceId: any){
    if(this.guestPaymentForm.invalid) return;

    this.addPayment.emit({event:{
      firstPage: false,
      lastPage: false,
      detailPage: false,
      isLoading: true,
        }
      })

    let paymentDto = this.mapFormValueToPaymentDto(invoiceId, this.guestPaymentForm.value);

    this._paymentService.addPayment(paymentDto).pipe(
      takeUntil(this.destroySubject)
      ).subscribe({
        next: response => {

          this._paymentService.getPaymentListByGuestCode(response.data.invoice.guest.guestCode);

          this.addPayment.emit({event:{
            firstPage: false,
            lastPage: false,
            detailPage: false,
            isLoading: false
          }
        })

        },
        error: error => {

          this.addPayment.emit({event:{
            firstPage: false,
            lastPage: false,
            detailPage: true,
            isLoading: false
          }})
        }
      })
     
  }

  mapFormValueToPaymentDto(invoiceId: number, paymentForm: any){

    return {
      amount: paymentForm.amount,
      date: paymentForm.date,
      invoiceId: invoiceId,
      paymentMethodId: paymentForm.paymentMethodId
    }
  }

}
