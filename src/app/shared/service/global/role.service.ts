import { Injectable } from '@angular/core';
import { Role } from 'core/model/role';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api-service.service';
import { RoleEndPoints } from 'shared/constants/api-constants';
import { RoleTable } from 'shared/service/global/role-table';
import { toRole, toRoleTable } from 'core/model/custom-map';



@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _roleList$ = new BehaviorSubject<RoleTable[]>([])

  
  roleList$ = this._roleList$.asObservable();

  constructor(
    private _apiService: ApiService,
    ) { }

  getRoleList(){
    this._apiService.get<Role[]>(RoleEndPoints.GET_ROLE).subscribe({
      next: response => {
        let data = response.data.map(res => {
          return toRoleTable(res);
        })
        this._roleList$.next(data); 
        localStorage.setItem('role', JSON.stringify(data));
      },
      error: error => {

      }
    })
  }

  roleStorageState(state: boolean){
    if(!state) return;
    let role  = this.roleFromStorage;
    this._roleList$.next(JSON.parse(role) as RoleTable[]);
  }

  findStorageRoleById(id: number): Role{
    let role = this.roleFromStorage;
    let _role = (JSON.parse(role) as RoleTable[]).find((role: RoleTable ) => role.id === id);
    return toRole(_role as RoleTable);
  }

  get roleFromStorage(): string{
    return localStorage.getItem('role') as string;
  }

}
