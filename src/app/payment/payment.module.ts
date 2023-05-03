import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from 'shared/shared.module';
import { PaymentBaseComponent } from './component/payment-base/payment-base.component';
import { PaymentService } from './service/payment.service';
import { UpdatePaymentComponent } from './component/update-payment/update-payment.component';
import { PaymentTypeService } from './service/payment-type.service';


@NgModule({
  declarations: [
    PaymentBaseComponent,
    UpdatePaymentComponent
  ],
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  providers: [
    PaymentService,
    PaymentTypeService,
  ]
})
export class PaymentModule { }
