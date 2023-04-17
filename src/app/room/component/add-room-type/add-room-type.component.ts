import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomTypeService } from 'room/service/room-type.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarComponent } from 'shared/component/snackbar/snackbar.component';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.scss']
})
export class AddRoomTypeComponent implements OnDestroy{
  private destroySubject: Subject<void> = new Subject();
  
  selectedFiles!: File;
  selectedFileNames: string[] = [];

  roomTypeForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _roomTypeService: RoomTypeService,
    private _snackbar: SnackbarService,
    ){
      this.roomTypeForm = this._fb.group({
        name: ['',[]],
        price: ['',[]],
        property: ['',[]],
        description: ['',[]],
        image: ['',[]],
      })
  }
  ngOnDestroy(){
    this.destroySubject.next();
  }

  onFormSubmit(){
    if(this.roomTypeForm.invalid) return;

    this._roomTypeService.addStaff(this.roomTypeForm.value).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this._roomTypeService.getRoomTypeList();
        this._snackbar.openSnackBar('Room type added successfully');
      },
      error: error => {}
    });
    this.roomTypeForm.reset();

  }

}
