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
export class RoomTypeService {

  private _roomTypeList$ = new BehaviorSubject<RoomTypeTable[]>([]);
  private _roomTypeCount$ = new BehaviorSubject<number>(0);

  
  roomTypeList$ = this._roomTypeList$.asObservable();
  roomTypeCount$ = this._roomTypeCount$.asObservable();

  constructor(
    private _apiService: ApiService,
    ) {
      
     }


  addStaff(type: RoomType){
    return this._apiService.add<RoomType>(RoomTypeEndPoints.ADD_TYPE, type);
  }

  updateRoomType(type: RoomType){
    
    return this._apiService.update<RoomType>(RoomTypeEndPoints.PUT_TYPE, type);
  }

  getRoomTypeList(){

    this._apiService.get<RoomType[]>(RoomTypeEndPoints.GET_TYPE).subscribe({
      next: response => {
        let data = response.data.map(res => {
          return toRoomTypeTable(res);
        })
        this._roomTypeList$.next(data);
        localStorage.setItem('room-type', JSON.stringify(data));
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

  totalRoomTypeCount(){
    this._apiService.get<number>(RoomTypeEndPoints.GET_TYPE_COUNT).subscribe({
      next: response => {
        this._roomTypeCount$.next(response.data);
      },
      error: error => {

      }
    })}

  get roomTypeFromStorage(): string{
    return localStorage.getItem('room-type') as string;
  }



}
