import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomTypeService } from 'room/service/room-type.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UpdateRoomTypeComponent } from '../update-room-type/update-room-type.component';

@Component({
  selector: 'room-type-card',
  templateUrl: './room-type-card.component.html',
  styleUrls: ['./room-type-card.component.scss']
})
export class RoomTypeCardComponent implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();

  roomType$: Observable<RoomTypeTable[]>

  constructor(
    private _roomTypeService: RoomTypeService,
    private _dialog: MatDialog,
  ){
    this.roomType$ = this._roomTypeService.roomTypeList$;
  }

  
  ngOnDestroy(): void {
    this.destroySubject.next();
  }

    //Open dialog to Edit an existing user
    openEditStaffForm(data: RoomTypeTable){
      console.log(data);
      const dialogRef = this._dialog.open(UpdateRoomTypeComponent, {
        data: data
      });
      
      dialogRef.afterClosed().pipe(
        takeUntil(this.destroySubject)
      ).subscribe({
        next: value => {
          if(!value){
            
          }
        }
      })
    }

}
