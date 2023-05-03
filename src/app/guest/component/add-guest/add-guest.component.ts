import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'core/model/gender';
import { GuestService } from 'guest/service/guest.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss']
})
export class AddGuestComponent implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();

  checkinForm: FormGroup;
  @Input('genderList$') genderList$!: Observable<Gender[]>;
  @Output('addGuest') addGuest = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _guestService: GuestService,){

    this.checkinForm = this._fb.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      genderId: ['', [Validators.required,]],
      checkIn: ['', [Validators.required,]],
      expireDate: ['', [Validators.required,]]

    })
  }
  
  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onFormSubmit(){
    if(!this.checkinForm.valid) return;
    
    this.addGuest.emit({event:{
      guestId: 0,
      firstPage: false,
      lastPage: false,
      detailPage: false,
      isLoading: true,
        }
      })

    this._guestService.addGuest(this.checkinForm.value).pipe(
      takeUntil(this.destroySubject)
      ).subscribe({
        next: response => {
          this.addGuest.emit({event:{
            guestId: response.data.id,
            firstPage: false,
            lastPage: true,
            detailPage: false,
            isLoading: false
          }
        })
        },
        error: error => {
          this.addGuest.emit({event:{
            guestId: 0,
            firstPage: true,
            lastPage: false,
            detailPage: false,
            isLoading: false
          }
        })
        }
      });
  }

}

