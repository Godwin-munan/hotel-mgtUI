import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
