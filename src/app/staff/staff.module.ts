import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from 'shared/shared.module';
import { StaffComponent } from './component/staff/staff.component';
import { AddStaffComponent } from './component/add-staff/add-staff.component';


const COMPONENTS: any[] = [
  StaffComponent,
  AddStaffComponent
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ],
  exports: [...COMPONENTS]
})
export class StaffModule { }
