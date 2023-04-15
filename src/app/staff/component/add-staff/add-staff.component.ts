import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gender } from 'core/model/gender';
import { IdCard } from 'core/model/id-card';
import { Job } from 'core/model/job';
import { Shift } from 'core/model/shift';
import { Staff } from 'core/model/staff';
import { StaffDto } from 'core/model/staffDto';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
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
export class AddStaffComponent implements OnInit, OnDestroy{ 

  private destroySubject: Subject<void> = new Subject();

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
    @Inject(MAT_DIALOG_DATA) public data: Staff,
    ){

    this.genderList$ = this._genderService.genderList$;
    this.jobList$ = this._jobService.jobList$;
    this.shiftList$ = this._shiftService.shiftList$;
    this.idCardList$ = this._idCardService.idCardList$;

    this.staffForm = this._fb.group({
      id: [''],
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      genderId: ['', [Validators.required,]],
      cardId: ['', [Validators.required,]],
      cardNo: ['', [Validators.required,]],
      jobId: ['', [Validators.required,]],
      shiftId: ['', [Validators.required,]],
      employDate: ['', [Validators.required,]],
      terminateDate: ['', []]

    })
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
  }
  

  ngOnInit(): void {
    if(this.data){
      let staff = this.data as Staff;
      this.staffForm.patchValue({
        cardId: staff.card.id,
        genderId: staff.gender.id,
        shiftId: staff.shift.id,
        jobId: staff.job.id,
      });
     
      this.staffForm.patchValue(this.data as Staff);
    }
    
  }

  

  onFormSubmit(){
    if(this.staffForm.valid){
      if(this.data){
        let staff = this.mapFormToStaff(this.staffForm.value);
        this._staffService.updateStaff(staff).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Employee updated successfully');
            this._dialogRef.close(false);
          },
          error: error => {}
        });
      }else{
        this._staffService.addStaff(this.staffForm.value).pipe(
          takeUntil(this.destroySubject)
        ).subscribe({
          next: () => {
            this._snackbar.openSnackBar('Employee added successfully');
            this._dialogRef.close(false);
          },
          error: error => {}
        });
      }
    }
    
  }

  mapFormToStaff(staff: any){

    let card = this._idCardService.findStorageShiftById(staff.cardId);
    let gender = this._genderService.findStorageGenderById(staff.genderId);
    let shift = this._shiftService.findStorageShiftById(staff.shiftId);
    let job = this._jobService.findStorageJobById(staff.jobId);

    return new Staff(
      staff.id,
      staff.firstName,
      staff.lastName,
      staff.email,
      staff.cardNo,
      staff.employDate,
      staff.terminateDate,
      card,
      gender,
      shift,
      job
    );
  }

}
