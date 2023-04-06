import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserComponent } from 'core/component/layout/app-user/app-user.component';
import { LoginComponent } from 'core/component/layout/login/login.component';
import { TestComponent } from 'shared/component/test/test.component';
import { AppRoles } from 'shared/constants/api-constants';
import { AdminGuard } from 'shared/service/authentication/admin-guard.guard';
import { AuthGuard } from 'shared/service/authentication/auth-guard.guard';
import { StaffComponent } from 'staff/component/staff/staff.component';

const routes: Routes = [
  {
    path: '',
     component: AppUserComponent,
     canActivate: [AuthGuard],
     canActivateChild: [AuthGuard],
     children: [
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
     ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
