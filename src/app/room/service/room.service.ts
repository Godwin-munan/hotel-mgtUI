import { Injectable } from '@angular/core';
import { ApiService } from 'shared/service/api/api-service.service';
import { Room } from 'core/model/room';
import { RoomEndPoints } from 'shared/constants/api-constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private _availableRoomCount$ = new BehaviorSubject<number>(0);
  private _occupiedRoomCount$ = new BehaviorSubject<number>(0);
  private _sum$ = new BehaviorSubject<number>(0);
  private _availableRoomList$ = new BehaviorSubject<Room[]>([]);
  
  availableRoomCount$ = this._availableRoomCount$.asObservable();
  occupiedRoomCount$ = this._occupiedRoomCount$.asObservable();
  sum$ = this._sum$.asObservable();
  availableRoomList$ = this._availableRoomList$.asObservable();

  constructor(
    private _apiService: ApiService,
  ) {}

  addUser(value: any) {
    return this._apiService.add<Room>(RoomEndPoints.ADD_RM, value);
  }

  updateRoom(room: Room){
    return this._apiService.update<Room>(RoomEndPoints.PUT_RM, room);
  }

  getRoomByTypeList(id: number){
    return this._apiService.getById<Room[]>(id , RoomEndPoints.GET_RM_TYPE_ID);
  }

  getAvailableRoomByTypeList(id: number){
    return this._apiService.getById<Room[]>(id , RoomEndPoints.GET_RM_AVL_TYPE_ID);
  }

  availableRoomByTypeList(id: number){
    this.getAvailableRoomByTypeList(id).subscribe({
      next: response => {
        this._availableRoomList$.next(response.data);
      },
      error: error => {

      }
    })
  }

  deleteRoom(id: number){
    return this._apiService.delete(RoomEndPoints.DELETE_RM, id)
  }

  availableRoomCount(){
    this._apiService.get<number>(RoomEndPoints.GET_RM_AVL_COUNT).subscribe({
      next: response => {
        this._availableRoomCount$.next(response.data)
      },
      error: error => {

      }
    })}

    totalRoomCount(){
      this._apiService.get<number>(RoomEndPoints.GET_RM_TOTAL_COUNT).subscribe({
        next: response => {
          this._sum$.next(response.data);
        },
        error: error => {
  
        }
      })}

  getCount(){
    this.availableRoomCount();
    this.occupiedRoomCount();
    this.totalRoomCount();
  }

  occupiedRoomCount(){
    this._apiService.get<number>(RoomEndPoints.GET_RM_OCC_COUNT).subscribe({
      next: response => {
        this._occupiedRoomCount$.next(response.data)
      },
      error: error => {

      }
    })}

}
