import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'shared/shared.module';
import { CoreModule } from 'core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffModule } from 'staff/staff.module';
import { PaymentModule } from 'payment/payment.module';
import { GuestModule } from 'guest/guest.module';
import { AppUserModule } from './app-user/app-user.module';
import { RoomModule } from 'room/room.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects, metaReducers, reducers } from './store';

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
    AppUserModule,
    RoomModule,
    BrowserAnimationsModule,
    StoreModule.forRoot( reducers, { metaReducers }),
    EffectsModule.forRoot([ AuthEffects ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
