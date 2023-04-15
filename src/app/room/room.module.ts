import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomBaseComponent } from './component/room-base/room-base.component';
import { SharedModule } from 'shared/shared.module';
import { StaffRoutingModule } from 'staff/staff-routing.module';
import { RoomsComponent } from './component/rooms/rooms.component';
import { RoomTypeComponent } from './component/room-type/room-type.component';
import { RoomService } from './service/room.service';
import { RoomTypeService } from './service/room-type.service';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';


const COMPONENTS: any[] = [
  RoomBaseComponent,
  RoomsComponent,
  RoomTypeComponent,
]

const SERVICES: any[] = [
  RoomService,
  RoomTypeService,
]


@NgModule({
  declarations: [...COMPONENTS, ImageUploadComponent,],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ],
  providers: [...SERVICES],
  exports: [...COMPONENTS],
})
export class RoomModule { }
