import { Component, OnDestroy, ViewChild } from '@angular/core';
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
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();
  roomTypeList$: Observable<RoomTypeTable[]>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<RoomTable>();
  displayedColumns: string[] = [
    'id',
    'code',
    'status',
    'roomType',
    'action',
  ];
  pageSizes = [5, 10];
  totalData!: number;
  isLoading = false;
  roomData!: Room[]

  constructor(
    private _roomTypeService: RoomTypeService,
    private _roomService: RoomService,
  ){
    this.roomTypeList$ =  this._roomTypeService.roomTypeList$;
  }


  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  //Get staff data table
  getRoomList(id: number) {
    this.isLoading = true;
    this._roomService.getRoomByTypeList(id).pipe(
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

  openEditRoomForm(room: RoomTable){

  }

  deleteRoom(id: number){

  }


  openAddRoomForm(){
    
  }

  openRoomByTypeForm(id: number){
    this.getRoomList(id);
  }
}
