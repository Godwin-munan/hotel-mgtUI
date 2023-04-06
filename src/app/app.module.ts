import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'shared/shared.module';
import { CoreModule } from 'core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffModule } from 'staff/staff.module';
import { PaymentModule } from 'payment/payment.module';
import { GuestModule } from 'guest/guest.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    StaffModule,
    PaymentModule,
    GuestModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
