import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { toRoomTypeTable } from 'core/model/custom-map';
import { Room } from 'core/model/room';
import { RoomTable } from 'room/room-table';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomTypeService } from 'room/service/room-type.service';
import { RoomService } from 'room/service/room.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.scss']
})
export class AvailableRoomComponent {

  private destroySubject: Subject<void> = new Subject();
  roomTypeList$!: Observable<RoomTypeTable[]>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<RoomTable>();
  displayedColumns: string[] = [
    'id',
    'code',
    'status',
    'roomType',
  ];
  pageSizes = [5, 10];
  totalData!: number;
  isLoading = false;
  roomData!: Room[]

  constructor(
    private _roomService: RoomService,
    private _roomTypeService: RoomTypeService,
    ){
      this.roomTypeList$ =  this._roomTypeService.roomTypeList$;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

    //Get staff data table
    getRoomList(id: number) {
      this.isLoading = true;
      this._roomService.getAvailableRoomByTypeList(id).pipe(
        takeUntil(this.destroySubject)
      ).subscribe({
        next: response => {
          let res = response.data;
          let data = res.map(res => {
            
            return new RoomTable(
              res.id,
              res.code,
              res.status,
              toRoomTypeTable(res.roomType),
            )
          })
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
          this.isLoading = false;
        },
       error: error => {}
      })
    }

    openRoomByTypeForm(id: number){
      this.getRoomList(id);
    }

}
