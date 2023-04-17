import { Injectable, OnDestroy } from '@angular/core';
import { toRoomTypeTable } from 'core/model/custom-map';
import { RoomType } from 'core/model/room-type';
import { RoomTypeTable } from 'room/room-type-table';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RoomTypeEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();

  private _roomTypeList$ = new BehaviorSubject<RoomTypeTable[]>([])

  
  roomTypeList$ = this._roomTypeList$.asObservable();

  constructor(
    private _apiService: ApiService,
    ) {
      
     }


  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  addStaff(type: RoomType){
    return this._apiService.add<RoomType>(RoomTypeEndPoints.ADD_TYPE, type);
  }

  updateRoomType(type: RoomType){
    
    return this._apiService.update<RoomType>(RoomTypeEndPoints.PUT_TYPE, type);
  }

  getRoomTypeList(){
    console.log('Hello');
    this._apiService.get<RoomType[]>(RoomTypeEndPoints.GET_TYPE).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: response => {
        let data = response.data.map(res => {
          return toRoomTypeTable(res);
        })
        this._roomTypeList$.next(data); 
        console.log('Hello');
        localStorage.setItem('room-type', JSON.stringify(response.data));
      },
      error: error => {

      }
    })
  }

  roomTypeStorageState(state: boolean){
    if(!state) return;
    let roomType  = this.roomTypeFromStorage;
    this._roomTypeList$.next(JSON.parse(roomType) as RoomTypeTable[]);
  }

  findStorageRoomTypeById(id: number): RoomTypeTable{
    let roomType = this.roomTypeFromStorage;
    let _roomType = (JSON.parse(roomType) as RoomTypeTable[]).find((type: RoomTypeTable ) => type.id === id);
    return _roomType as RoomTypeTable;
  }

  get roomTypeFromStorage(): string{
    return localStorage.getItem('room-type') as string;
  }



}
