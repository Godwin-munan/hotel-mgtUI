import { Injectable } from '@angular/core';
import { Staff } from 'core/model/staff';
import { StaffDto } from 'core/model/staffDto';
import { BehaviorSubject } from 'rxjs';
import { StaffEndPoints } from 'shared/constants/api-constants';
import { ApiService } from 'shared/service/api/api-service.service';
import { staffTable } from 'staff/staff-table';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private _staffList$ = new BehaviorSubject<Staff[]>([])

  
  staffList$ = this._staffList$.asObservable();

  constructor(
    private _apiService: ApiService,
    ) {}

  addStaff(staff: StaffDto){
    return this._apiService.add<Staff>(StaffEndPoints.ADD_STAFF, staff)
  }

  getStaffPage(field: string, page: number, size: number){
    return this._apiService.getPage<staffTable>(StaffEndPoints.GET_STAFF_PAGE, field, page, size)
  }

  deleteStaff(id: number){
    return this._apiService.delete(StaffEndPoints.DELETE_STAFF, id)
  }

  updateStaff(staff: Staff){
    return this._apiService.update<Staff>(StaffEndPoints.PUT_STAFF, staff)
    
  }
}
