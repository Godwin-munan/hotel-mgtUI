import { Injectable } from '@angular/core';
import { RoomTypeService } from './room-type.service';
import { ApiService } from 'shared/service/api/api-service.service';
import { Room } from 'core/model/room';
import { RoomEndPoints } from 'shared/constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private _apiService: ApiService,
  ) {}

  getRoomByTypeList(id: number){
    return this._apiService.getById<Room[]>(id , RoomEndPoints.GET_RM_TYPE_ID)
  }

}
