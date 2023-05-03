import { Component, Input } from '@angular/core';
import { Invoice } from 'core/model/invoice';
import { Payment } from 'core/model/payment';
import { Observable } from 'rxjs';

@Component({
  selector: 'payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.scss']
})
export class PaymentInvoiceComponent {
  
  @Input('invoice$') invoice$!: Observable<Partial<Invoice>>;
  @Input('paymentList$') paymentList$!: Observable<Payment[]>;

}
