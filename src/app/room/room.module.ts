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
import { AddRoomTypeComponent } from './component/add-room-type/add-room-type.component';
import { RoomTypeCardComponent } from './component/room-type-card/room-type-card.component';
import { UpdateRoomTypeComponent } from './component/update-room-type/update-room-type.component';
import { AddRoomComponent } from './component/add-room/add-room.component';
import { AvailableRoomComponent } from './component/available-room/available-room.component';


const COMPONENTS: any[] = [
  RoomBaseComponent,
  RoomsComponent,
  RoomTypeComponent,
  ImageUploadComponent, 
  AddRoomTypeComponent, 
  RoomTypeCardComponent,
]

const SERVICES: any[] = [
  RoomService,
  RoomTypeService,
]


@NgModule({
  declarations: [...COMPONENTS, UpdateRoomTypeComponent, AddRoomComponent, AvailableRoomComponent, ],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ],
  providers: [...SERVICES],
  exports: [...COMPONENTS],
})
export class RoomModule { }
