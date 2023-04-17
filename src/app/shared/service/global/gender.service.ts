import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from '../api/api-service.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Gender } from 'core/model/gender';
import { GenderEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class GenderService implements OnDestroy{
  private destroySubject: Subject<void> = new Subject();
  
  private _genderList$ = new BehaviorSubject<Gender[]>([])

  
  genderList$ = this._genderList$.asObservable();

  constructor(private _apiService: ApiService) { }
  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  getGenderList(){
    this._apiService.get<Gender[]>(GenderEndPoints.GET_GENDER).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: response => {
        this._genderList$.next(response.data); 
        localStorage.setItem('gender', JSON.stringify(response.data));
      },
      error: error => {

      }
    })
  }

  genderStorageState(state: boolean){
    if(!state) return;
    let gender  = this.genderFromStorage;
    this._genderList$.next(JSON.parse(gender) as Gender[]);
  }

  findStorageGenderById(id: number): Gender{
    let gender = this.genderFromStorage;
    let _gender = (JSON.parse(gender) as Gender[]).find((gender: Gender ) => gender.id === id);
    return _gender as Gender;
  }

  get genderFromStorage(): string{
    return localStorage.getItem('gender') as string;
  }
}
