import { Injectable } from '@angular/core';
import { Staff } from 'core/model/staff';
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
    private _apiService: ApiService
    ) { }

  addStaff(staff: Staff){
    this._apiService.add<Staff>(StaffEndPoints.ADD_STAFF, staff).subscribe({
      next: response => {
        
      },
      error: error => {

      }
    })
  }

  getStaffPage(field: string, page: number, size: number){
    return this._apiService.getPage<staffTable>(StaffEndPoints.GET_STAFF_PAGE, field, page, size)
  }

  deleteStaff(id: number){
    return this._apiService.delete(StaffEndPoints.DELETE_STAFF, id)
  }

  updateStaff(data: Staff){
    this._apiService.update(StaffEndPoints.PUT_STAFF, data).subscribe({
      next: response => {
        console.log(response.data);
      },
      error: error => {

      }
    }

    )
  }
}
