import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { PaymentService } from 'payment/service/payment.service';
import { Subject, takeUntil } from 'rxjs';
import { UpdatePaymentComponent } from '../update-payment/update-payment.component';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'app-payment-base',
  templateUrl: './payment-base.component.html',
  styleUrls: ['./payment-base.component.scss'],
})
export class PaymentBaseComponent implements OnDestroy{
  
  private destroySubject: Subject<void> = new Subject();

  code!: string;
  savedCode!: string;
  msg: string = 'Enter valid invoice code to get content';
  paymentList!: Payment[];
  invoice!: Invoice
  error: boolean = false;
  paymentState: boolean = (this.paymentList && this.error);
  isLoading = false;

  constructor(
    private _paymentService: PaymentService,
    private _dialog: MatDialog,
    private _snackbar: SnackbarService,
  ){
    
  }
 
  ngOnDestroy(){
    this.destroySubject.next();
  }

  getPaymentList(code: string){
    this.isLoading = true;

    this._paymentService.getPaymentListByCode(code).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: response => {
        this.paymentList = response.data
        this.invoice = response.data[0].invoice

        this.isLoading = false;
      },
      error: error => {
        this.error = true;
        this.isLoading = false;
        if(error.originalError.status === 400){
          this.msg = 'Invalid invoice code';
        }
      }
    });

  }

  submitSearch(){
    if(!this.code) return;
    this.error = false;
    this.savedCode = this.code;

    this.getPaymentList(this.code);

    this.code = '';
  }

  updatePayment(data: Payment){

    const dialogRef = this._dialog.open(UpdatePaymentComponent, {
      data: data
    });
    
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: value => {
        if(!value){
          this.getPaymentList(this.savedCode);
        }
      },
      error: error => {
        this.error = true;
        this.msg = error.originalError.message;
      } 
    });
  }

   //Delete payment
   deletePayment(id: number){

    if(!confirm('Comfirm to delete Payment')) return;

    this._paymentService.deletePayment(id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
        next: response => {
          this._snackbar.openSnackBar(response.message)
          this.getPaymentList(this.savedCode);
        }
      });

  }

}
