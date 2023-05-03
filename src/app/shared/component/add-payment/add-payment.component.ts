import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef } from '@angular/material/dialog';
import { Payment } from 'core/model/payment';
import { PaymentMethod } from 'core/model/payment-method';
import { PaymentTypeService } from 'payment/service/payment-type.service';
import { PaymentService } from 'payment/service/payment.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit, OnDestroy  {

  private destroySubject: Subject<void> = new Subject();

  paymentForm: FormGroup;
  methodList$: Observable<PaymentMethod[]>;

  constructor(
    private _fb: FormBuilder,
    private _paymentTypeService: PaymentTypeService,
    private _paymentService: PaymentService,
    private _snackbar: SnackbarService,
    private _dialogRef: MatDialogRef<AddPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){

    this.methodList$ = this._paymentTypeService.PaymentMethodList$;

    this.paymentForm = this._fb.group({
      id: ['', []],
      amount: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]],
      invoice: ['', []],
      paymentMethodId: ['', []]
    })
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  ngOnInit(): void {
    if(this.data.data){
      let payment = this.data.data;

      this.paymentForm.patchValue({
        paymentMethodId: this.data.data.paymentMethod.id
      })
     
      this.paymentForm.patchValue(payment);
    }
    
  }

  onFormSubmit(){

    if(this.paymentForm.valid){

      if(this.data.data){
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
      }else {
        let payment = this.mapFormToAddPayment(this.paymentForm.value, this.data.id);
        this._paymentService.addPayment(payment).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Payment Added successfully');
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

  mapFormToAddPayment(payment: any, id: any){
    return {
      "amount": payment.amount,
      "date": payment.paymentDate,
      "invoiceId": id,
      "paymentMethodId": payment.paymentMethodId
    }
  }

}
