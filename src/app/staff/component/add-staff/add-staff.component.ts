import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from 'core/model/gender';
import { IdCard } from 'core/model/id-card';
import { Job } from 'core/model/job';
import { Shift } from 'core/model/shift';
import { Staff } from 'core/model/staff';
import { Observable } from 'rxjs';
import { GenderService } from 'shared/service/global/gender.service';
import { IdCardService } from 'shared/service/global/id-card.service';
import { JobService } from 'shared/service/global/job.service';
import { ShiftService } from 'shared/service/global/shift.service';
import { SnackbarService } from 'shared/service/global/snackbar.service';
import { StaffService } from 'staff/service/staff.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit{ 
  data: Staff = inject(MAT_DIALOG_DATA);
  staffForm: FormGroup;
  genderList$: Observable<Gender[]>;
  jobList$: Observable<Job[]>;
  shiftList$: Observable<Shift[]>;
  idCardList$: Observable<IdCard[]>;

  constructor(
    private _fb: FormBuilder,
    private _genderService: GenderService,
    private _jobService: JobService,
    private _shiftService: ShiftService,
    private _idCardService: IdCardService,
    private _staffService: StaffService,
    private _snackbar: SnackbarService,
    private _dialogRef: MatDialogRef<AddStaffComponent>,
    ){

    this.genderList$ = this._genderService.genderList$;
    this.jobList$ = this._jobService.jobList$;
    this.shiftList$ = this._shiftService.shiftList$;
    this.idCardList$ = this._idCardService.idCardList$;

    this.staffForm = this._fb.group({
      id: [''],
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      email: ['', [Validators.required,]],
      genderType: ['', [Validators.required,]],
      cardType: ['', [Validators.required,]],
      cardNo: ['', [Validators.required,]],
      jobTitle: ['', [Validators.required,]],
      shiftType: ['', [Validators.required,]],
      employDate: ['', [Validators.required,]],
      terminateDate: ['', []]

    })
  }

  ngOnInit(): void {
    if(this.data){
      this.staffForm.patchValue({
        cardType: this.data.card.type,
        genderType: this.data.gender.type,
        shiftType: this.data.shift.type,
        jobTitle: this.data.job.title,
      });
    }
    this.staffForm.patchValue(this.data);
  }

  

  onFormSubmit(){
    if(this.staffForm.valid){
      if(this.data){
        this.data = this.staffForm.value;
        this._staffService.updateStaff(this.data);
        this._snackbar.openSnackBar('Employee updated successfully');
      }else{
        this._staffService.addStaff(this.staffForm.value);
        this._snackbar.openSnackBar('Employee added successfully');
      }
      
      this._dialogRef.close(true);
    }
    
  }

}
