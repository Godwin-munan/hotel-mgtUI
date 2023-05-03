import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'core/model/invoice';
import { GuestService } from 'guest/service/guest.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { InvoiceService } from 'shared/service/invoice.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnDestroy{
  private destroySubject: Subject<void> = new Subject();

  'guest_code'!: number;

  invoice$!: Observable<Partial<Invoice>>;
  isLoading$!: Observable<boolean>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _invoiceService: InvoiceService,
    private _guestService: GuestService,
    ){

    this._route.queryParams.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(param => {
      this.guest_code = param['code'];
    })
    this.isLoading$ = this._invoiceService.isLoading$;
    this._invoiceService.getInvoiceByGuest(this.guest_code);
    this.invoice$ = this._invoiceService.invoice$;

  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  canCheckOut(invoice: any) : boolean{
    return invoice.invoiceTotal > invoice.paymentTotal;
  }

  submitCheckOut(guest_id: any){
    if(!guest_id) return;

    this._guestService.checkOutGuest({
      "guest_id": guest_id,
      "checkOut": new Date()
    }).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: response => {
        this._router.navigate(['/guest']);
      },
      error: error => {

      }
    })

  }



}
