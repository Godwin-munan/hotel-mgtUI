import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { AddRoomComponent } from '../add-room/add-room.component';
import { SnackbarService } from 'shared/service/global/snackbar.service';

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
    private _snackbar: SnackbarService,
    private _dialog: MatDialog,
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

  deleteRoom(room: RoomTable){

    if(!confirm('Comfirm to delete Room')) return;

    this._roomService.deleteRoom(room.id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
        next: response => {
          this._snackbar.openSnackBar(response.message)
          this.getRoomList(room.roomType.id);
          
        }
      });

  }


  //Open dialog to add a new Room
  openAddRoomForm(){
    const dialogRef = this._dialog.open(AddRoomComponent);
    
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: value => {
        if(!value.state){
          this.getRoomList(value.id);
        }
      }
    })
  }

    //Open dialog to Edit an existing Room
    openEditRoomForm(data: RoomTable){
      const dialogRef = this._dialog.open(AddRoomComponent, {
        data: data
      });
      
      dialogRef.afterClosed().pipe(
        takeUntil(this.destroySubject)
      ).subscribe({
        next: value => {
          if(!value.state){
            this.getRoomList(value.id);
          }
        }
      })
    }

  openRoomByTypeForm(id: number){
    this.getRoomList(id);
  }
}
