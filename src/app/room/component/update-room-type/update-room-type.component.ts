import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toRoomType } from 'core/model/custom-map';
import { RoomTypeTable } from 'room/room-type-table';
import { RoomTypeService } from 'room/service/room-type.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'app-update-room-type',
  templateUrl: './update-room-type.component.html',
  styleUrls: ['./update-room-type.component.scss']
})
export class UpdateRoomTypeComponent implements OnInit, OnDestroy{
  @Output('toggleLoading') toggleLoading = new EventEmitter();

  private destroySubject: Subject<void> = new Subject();

  roomTypeForm: FormGroup;

  

  constructor(
    private _fb: FormBuilder,
    private _roomTypeService: RoomTypeService,
    private _dialogRef: MatDialogRef<UpdateRoomTypeComponent>,
    private _snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: RoomTypeTable,
  ){
    this.roomTypeForm = this._fb.group({
      id: ['', []],
      name: ['', []],
      price: ['', []],
      property: ['', []],
      description: ['', []],
      image: ['', []]
    })
  }

  ngOnInit(): void {
    if(this.data){
      let roomType = toRoomType(this.data as RoomTypeTable)
     
      this.roomTypeForm.setValue(roomType);
    }
    
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onFormSubmit(){
    if(this.roomTypeForm.valid){
      if(this.data){
        this.toggleLoading.emit();
        this._roomTypeService.updateRoomType(this.roomTypeForm.value).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._roomTypeService.getRoomTypeList();
            this._snackbar.openSnackBar('Room Type updated successfully');
            this._dialogRef.close(false);
            this.toggleLoading.emit();
          },
          error: error => {}
        });
      }
    }
    
  }

}
