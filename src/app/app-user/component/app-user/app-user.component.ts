import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'core/model/app-user';
import { SnackbarService } from 'shared/service/global/snackbar.service';
import { AddStaffComponent } from 'staff/component/add-staff/add-staff.component';
import { UserTable } from '../../user-table';
import { AppUserService } from '../../services/app-user.service';
import { MatSort } from '@angular/material/sort';
import { toRoleTable } from 'core/model/custom-map';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<UserTable>();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'username',
    'role',
    'action' 
  ];
  pageSizes = [5, 10];
  totalData!: number;
  isLoading = false;
  staffData!: AppUser[]

  constructor(
    private _dialog: MatDialog,
    private _userService: AppUserService,
    private _snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    ){}

  
  //Open dialog to add a new staff
  openAddStaffForm(){
    const dialogRef = this._dialog.open(AddUserComponent);
      
    dialogRef.afterClosed().subscribe({
      next: value => {
        if(!value){
          this.getUserList();
        }
      }
    })
  }


  //Open dialog to Edit an existing user
  openEditStaffForm(data: AppUser){
    const dialogRef = this._dialog.open(AddUserComponent, {
      data: data
    });
    
    dialogRef.afterClosed().subscribe({
      next: value => {
        if(!value){
          this.getUserList();
        }
      }
    })
  }

  
  //Get staff data table
  getUserList() {
    this.isLoading = true;
    this._userService.getUserList().subscribe({
      next: response => {
        let res = response.data;
        let data = res.map(res => {
          
          return new UserTable(
            res.id,
            res.firstName,
            res.lastName,
            res.username,
            toRoleTable(res.roles[0]),
          )
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.isLoading = false;
      },
     error: error => {}
    })
  }

  ngAfterViewInit() {
    this.getUserList();
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  //Delete staff
  deleteStaff(id: number){

    if(!confirm('Comfirm to delete staff')) return;

    this._userService.deleteUser(id)
      .subscribe({
        next: response => {
          this._snackbar.openSnackBar(response.message)
          this.getUserList();
          
        }
      });

  }


}
