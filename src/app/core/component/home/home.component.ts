import { Component } from '@angular/core';
import { GuestService } from 'guest/service/guest.service';
import { RoomTypeService } from 'room/service/room-type.service';
import { RoomService } from 'room/service/room.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  availableRoomCount$: Observable<number>;
  occupiedRoomCount$: Observable<number>;
  currentGuestCount$: Observable<number>;
  roomTypeCount$: Observable<number>;
  sum$: Observable<number>;

  constructor(
    private _roomService: RoomService,
    private _guestService: GuestService,
    private _roomTypeService: RoomTypeService,
    ){

    this._roomService.getCount();
    this._guestService.currentGuestCount();
    this._roomTypeService.totalRoomTypeCount();

    this.availableRoomCount$ = this._roomService.availableRoomCount$;
    this.occupiedRoomCount$ = this._roomService.occupiedRoomCount$;
    this.currentGuestCount$ = this._guestService.currentGuestCount$;
    this.sum$ = this._roomService.sum$;
    this.roomTypeCount$ = this._roomTypeService.roomTypeCount$;
  }
}
