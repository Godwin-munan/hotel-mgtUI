import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from 'core/model/room';
import { GuestService } from 'guest/service/guest.service';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomService } from 'room/service/room.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'add-guest-room',
  templateUrl: './add-guest-room.component.html',
  styleUrls: ['./add-guest-room.component.scss']
})
export class AddGuestRoomComponent {
  private destroySubject: Subject<void> = new Subject();
  
  @Input('roomTypeList$') roomTypeList$!: Observable<RoomTypeTable[]>;
  @Input('guestId') guestId!: number;
  @Output('addRooms') addRooms = new EventEmitter();
  availableRoomList$!: Observable<Room[]>
  selectedRoom = new Set<any>();
  roomList: number[] = [];

  constructor(
    private _roomService: RoomService,
    private _guestService: GuestService,
    ){
    this.availableRoomList$ = this._roomService.availableRoomList$;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }


  getRooms(id: number){
    this._roomService.availableRoomByTypeList(id);

  }

  showroom(room: any){
    this.selectedRoom.add(room);
  }

  removeRoom(room: any){
    this.selectedRoom.delete(room);
  }

  submitRoomList(){
    if(this.selectedRoom.size < 1) return;

    this.addRooms.emit({event:{
      guestId: 0,
      firstPage: false,
      lastPage: false,
      detailPage: false,
      isLoading: true
      }
    })


    this.selectedRoom.forEach(room => {
      this.roomList.push(room.id);
    })
    let roomIds = { roomIds: this.roomList };
    this._guestService.addRoomsToGuest(this.guestId, roomIds).pipe(
      takeUntil(this.destroySubject)
      ).subscribe({
        next: response => {

          this.addRooms.emit({event:{
            guestId: response.data.id,
            firstPage: false,
            lastPage: false,
            detailPage: true,
            isLoading: false
          }
        })
        },
        error: error => {
          this.addRooms.emit({event:{
            guestId: 0,
            firstPage: false,
            lastPage: true,
            detailPage: false,
            isLoading: false
          }
        })
        }
      })
  }

}
