import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUserComponent } from './component/app-user/app-user.component';
import { SharedModule } from 'shared/shared.module';
import { StaffRoutingModule } from 'staff/staff-routing.module';
import { AddUserComponent } from './component/add-user/add-user.component';

const COMPONENTS: any[] = [
  AppUserComponent,
  AddUserComponent,
]

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ],
  exports: [...COMPONENTS]
})
export class AppUserModule { }
