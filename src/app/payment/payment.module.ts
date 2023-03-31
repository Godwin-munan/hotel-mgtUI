import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
