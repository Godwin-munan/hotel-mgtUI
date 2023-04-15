import { Injectable } from '@angular/core';
import { IdCard } from 'core/model/id-card';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api-service.service';
import { IdCardEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class IdCardService {
  private _idCardList$ = new BehaviorSubject<IdCard[]>([])

  
  idCardList$ = this._idCardList$.asObservable();

  constructor(private _apiService: ApiService) { }

  getIdCardList(){
    this._apiService.get<IdCard[]>(IdCardEndPoints.GET_CID).subscribe({
      next: response => {
        this._idCardList$.next(response.data); 
        localStorage.setItem('card', JSON.stringify(response.data));
      },
      error: error => {

      }
    })
  }

  cardStorageState(state: boolean){
    if(!state) return;
    let card  = this.cardFromStorage;
    this._idCardList$.next(JSON.parse(card) as IdCard[]);
  }

  findStorageShiftById(id: number): IdCard{
    let card = this.cardFromStorage;
    let _card = (JSON.parse(card) as IdCard[]).find((card: IdCard ) => card.id === id);
    return _card as IdCard;
  }

  get cardFromStorage(): string{
    return localStorage.getItem('card') as string;
  }
}
