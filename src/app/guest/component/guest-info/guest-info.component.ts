import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { PaymentService } from 'payment/service/payment.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AddPaymentComponent } from 'shared/component/add-payment/add-payment.component';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'guest-info',
  templateUrl: './guest-info.component.html',
  styleUrls: ['./guest-info.component.scss']
})
export class GuestInfoComponent implements OnInit,  OnDestroy{
  private destroySubject: Subject<void> = new Subject();
  
 @Input('paymentList$') paymentList$!: Observable<Payment[]>;
 @Input('invoice$') invoice$!: Observable<Partial<Invoice>>;
 @Output('updatePage') updatePage = new EventEmitter();

 constructor(
  private _dialog: MatDialog,
  private _paymentService: PaymentService,
  private _snackbar: SnackbarService,
  ){
    
  }


  ngOnInit(): void {
    
  }

 ngOnDestroy(){
  this.destroySubject.next();
}

balance(invoiceTotal: any, paymentTotal: any){
  return invoiceTotal - paymentTotal;
}


 //Open dialog to add a new staff
 openAddPaymentForm(id: any, email: any){
  const dialogConfig = new MatDialogConfig();
  console.log('Guest id: ',id)
  dialogConfig.data = {
    id: id
  };

  const dialogRef = this._dialog.open(AddPaymentComponent, dialogConfig);
    
  dialogRef.afterClosed().pipe(
    takeUntil(this.destroySubject)
    ).subscribe({
      next: value => {
      if(!value){
          console.log('GUEST INFO EMAIL: ',email)
          this.updatePage.emit({event:email});
        }
      }
   })
  }

}
