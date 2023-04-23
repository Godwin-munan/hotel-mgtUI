import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'core/model/payment';
import { PaymentMethod } from 'core/model/payment-method';
import { PaymentTypeService } from 'payment/service/payment-type.service';
import { PaymentService } from 'payment/service/payment.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<void> = new Subject();

  paymentForm: FormGroup;
  methodList$: Observable<PaymentMethod[]>;

  constructor(
    private _fb: FormBuilder,
    private _paymentTypeService: PaymentTypeService,
    private _paymentService: PaymentService,
    private _snackbar: SnackbarService,
    private _dialogRef: MatDialogRef<UpdatePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment,
  ){

    this.methodList$ = this._paymentTypeService.PaymentMethodList$;

    this.paymentForm = this._fb.group({
      id: ['', []],
      amount: ['', []],
      paymentDate: ['', []],
      invoice: ['', []],
      paymentMethodId: ['', []]
    })
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  ngOnInit(): void {
    if(this.data){
      let payment = this.data;

      this.paymentForm.patchValue({
        paymentMethodId: this.data.paymentMethod.id
      })
     
      this.paymentForm.patchValue(payment);
    }
    
  }

  onFormSubmit(){

    if(this.paymentForm.valid){

      if(this.data){
        let payment = this.mapFormToUpdatePayment(this.paymentForm.value);

        this._paymentService.updatePayment(payment).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Payment updated successfully');
            this._dialogRef.close(false);
          },
          error: error => {}
        });

      }

    }
  }

  mapFormToUpdatePayment(payment: any){
    return new Payment(
      payment.id,
      payment.amount,
      payment.paymentDate,
      payment.invoice,
      this._paymentTypeService.findStoragePaymentMethodById(payment.paymentMethodId)
    )
  }

}
