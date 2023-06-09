import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'core/component/layout/main-layout/main-layout.component';
import { LoginComponent } from 'core/component/layout/login/login.component';
import { TestComponent } from 'shared/component/test/test.component';
import { AppRoles } from 'shared/constants/api-constants';
import { AdminGuard } from 'shared/service/authentication/admin-guard.guard';
import { AuthGuard } from 'shared/service/authentication/auth-guard.guard';
import { StaffComponent } from 'staff/component/staff/staff.component';
import { AppUserComponent } from './app-user/component/app-user/app-user.component';
import { RoomBaseComponent } from 'room/component/room-base/room-base.component';
import { PaymentBaseComponent } from 'payment/component/payment-base/payment-base.component';
import { HomeComponent } from 'core/component/home/home.component';
import { AvailableRoomComponent } from 'room/component/available-room/available-room.component';
import { GuestBaseComponent } from 'guest/component/guest-base/guest-base.component';
import { CheckinComponent } from 'guest/component/checkin/checkin.component';
import { CheckOutComponent } from 'guest/component/check-out/check-out.component';

const routes: Routes = [
  {
    path: '',
     component: MainLayoutComponent,
     canActivate: [AuthGuard],
     canActivateChild: [AuthGuard],
     children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'avl-room',
        component: AvailableRoomComponent,
      },
      {
        path: 'guest',
        component: GuestBaseComponent,
      },
      {
        path: 'checkin',
        component: CheckinComponent,
      },
      {
        path: 'checkout',
        component: CheckOutComponent,
      },
      {
        path: 'test',
        component: TestComponent,
        canActivate: [AdminGuard],
        data: {
          role: AppRoles.ADMIN
        }
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [AdminGuard],
        data: {
          role: AppRoles.ADMIN
        },
      },
      {
        path: 'user',
        component: AppUserComponent,
        canActivate: [AdminGuard],
        data: {
          role: AppRoles.ADMIN
        },
      },
      {
        path: 'room',
        component: RoomBaseComponent,
        canActivate: [AdminGuard],
        data: {
          role: AppRoles.ADMIN
        },
      },
      {
        path: 'payment',
        component: PaymentBaseComponent,
        canActivate: [AdminGuard],
        data: {
          role: AppRoles.ADMIN
        },
      },
     ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
