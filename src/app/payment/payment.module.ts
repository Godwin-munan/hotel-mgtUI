import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from 'shared/shared.module';
import { PaymentBaseComponent } from './component/payment-base/payment-base.component';


@NgModule({
  declarations: [
    PaymentBaseComponent
  ],
  imports: [
    SharedModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
