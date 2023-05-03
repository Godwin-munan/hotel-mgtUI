import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from 'shared/shared.module';
import { GuestBaseComponent } from './component/guest-base/guest-base.component';
import { FindGuestComponent } from './component/find-guest/find-guest.component';
import { CheckinComponent } from './component/checkin/checkin.component';
import { GuestInfoComponent } from './component/guest-info/guest-info.component';
import { AvailableGuestComponent } from './component/available-guest/available-guest.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { AddGuestComponent } from './component/add-guest/add-guest.component';
import { AddGuestRoomComponent } from './component/add-guest-room/add-guest-room.component';
import { GuestPaymentComponent } from './component/guest-payment/guest-payment.component';

@NgModule({
  declarations: [
    GuestBaseComponent,
    FindGuestComponent,
    CheckinComponent,
    GuestInfoComponent,
    AvailableGuestComponent,
    CheckOutComponent,
    AddGuestComponent,
    AddGuestRoomComponent,
    GuestPaymentComponent,
  ],
  imports: [
    SharedModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
