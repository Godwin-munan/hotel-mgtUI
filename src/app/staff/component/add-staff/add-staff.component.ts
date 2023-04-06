import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'core/model/gender';
import { IdCard } from 'core/model/id-card';
import { Job } from 'core/model/job';
import { Shift } from 'core/model/shift';
import { Observable } from 'rxjs';
import { GenderService } from 'shared/service/global/gender.service';
import { IdCardService } from 'shared/service/global/id-card.service';
import { JobService } from 'shared/service/global/job.service';
import { ShiftService } from 'shared/service/global/shift.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {
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
    ){

    this.genderList$ = this._genderService.genderList$;
    this.jobList$ = this._jobService.jobList$;
    this.shiftList$ = this._shiftService.shiftList$;
    this.idCardList$ = this._idCardService.idCardList$;

    this.staffForm = this._fb.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      email: ['', [Validators.required,]],
      genderType: ['', [Validators.required,]],
      cardType: ['', [Validators.required,]],
      cardNo: ['', [Validators.required,]],
      jobTitle: ['', [Validators.required,]],
      shiftType: ['', [Validators.required,]],
      employDate: ['', [Validators.required,]],
      terminateDate: ['', [Validators.required,]]

    })
  }

  onFormSubmit(){
    console.log(this.staffForm.value)
  }
}
