import { JsonPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toRoom, toRoomType } from 'core/model/custom-map';
import { RoomTable } from 'room/room-table';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomTypeService } from 'room/service/room-type.service';
import { RoomService } from 'room/service/room.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit,  OnDestroy{

  private destroySubject: Subject<void> = new Subject();

  roomForm: FormGroup;
  roomTypeList$: Observable<RoomTypeTable[]>

  constructor(
    private _fb: FormBuilder,
    private _snackbar: SnackbarService,
    private _roomTypeService: RoomTypeService,
    private _roomService: RoomService,
    private _dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomTable,
    ){

      this.roomTypeList$ = this._roomTypeService.roomTypeList$;

    this.roomForm = this._fb.group({
      id: [''],
      code: ['', []],
      status: ['', []],
      roomTypeId: ['', []],
    })
  }

  ngOnDestroy(){
    this.destroySubject.next();
  }

  ngOnInit(): void {
    if(this.data){
      let room = this.data as RoomTable;

      this.roomForm.patchValue({
        roomTypeId: this.data.roomType.id
      })
     
      this.roomForm.patchValue(room);
    }
    
  }

  

  onFormSubmit(){
    if(this.roomForm.valid){
      if(this.data){

        let room = this.mapFormToUpdateRoom(this.roomForm.value);

        this._roomService.updateRoom(room).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Room updated successfully');
            this._dialogRef.close({
              state:false,
              id: this.roomForm.value.roomTypeId
            });
          },
          error: error => {}
        });

      }else{
        let room = this.mapFormToAddRoom(this.roomForm.value);
        this._roomService.addUser(room).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Room added successfully');
            this._dialogRef.close({
              state:false,
              id: this.roomForm.value.roomTypeId
            });
          },
          error: error => {}
        });;
      }
    }
  }

  mapFormToAddRoom(room: any){

    return {
      code: room.code,
      roomTypeId: room.roomTypeId,
    }
   
  }

  mapFormToUpdateRoom(room: any){

    let roomt = this._roomTypeService.findStorageRoomTypeById(room.roomTypeId);

    return {
      id: room.id,
      code: room.code,
      status: room.status,
      roomType: toRoomType(roomt)
    }
  }

}
