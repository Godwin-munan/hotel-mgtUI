
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'core/model/staff';
import { HttpResponse } from 'core/utils/http-response';
import { ObservableInput, Subject, catchError, map, startWith, switchMap, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';
import { AddStaffComponent } from 'staff/component/add-staff/add-staff.component';
import { StaffService } from 'staff/service/staff.service';
import { staffTable } from 'staff/staff-table';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements AfterViewInit, OnDestroy{
  
  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Staff>();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'job',
    'shift',
    'employDate',
    'terminateDate', 
    'salary',
    'action' 
  ];
  pageSizes = [5, 10];
  totalData!: number;
  field: string = 'id';
  isLoading = false;
  staffData!: Staff[]

  private destroySubject: Subject<void> = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _staffService: StaffService,
    private _snackbar: SnackbarService,
    private cdr: ChangeDetectorRef,
    ){}


  ngOnDestroy(): void {
    this.destroySubject.next();
  }


  //Open dialog to add a new staff
  openAddStaffForm(){
    const dialogRef = this._dialog.open(AddStaffComponent);
      
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: value => {
        if(!value){
          this.getPagination();
        }
      }
    })
  }


  //Open dialog to Edit an existing user
  openEditStaffForm(data: Staff){
    const dialogRef = this._dialog.open(AddStaffComponent, {
      data: data
    });
    
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: value => {
        if(!value){
          this.getPagination();
        }
      }
    })
  }

  
  //Get staff data table
  getTableData$(pageNumber: number, pageSize: number) {
    this.isLoading = true;
    return this._staffService.getStaffPage(this.field , pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getPagination();
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

    this._staffService.deleteStaff(id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
        next: response => {
          this._snackbar.openSnackBar(response.message)
          this.getPagination();
          
        }
      });
  }

  //Pagination 
  private getPagination(){
    
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getTableData$(this.paginator.pageIndex, this.paginator.pageSize)
          .pipe<HttpResponse<staffTable>>
          (catchError<HttpResponse<staffTable>, ObservableInput<any>>(() => observableOf(null)));
        }),
        map((staffData) => {
          if (staffData == null) return [];
          this.totalData = staffData.data.totalElements;
          return staffData.data.content;
        })
      )
      .subscribe((staffData) => {
        this.staffData = staffData;
        this.dataSource = new MatTableDataSource(this.staffData);
        this.isLoading = false
      });
  }

}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}

