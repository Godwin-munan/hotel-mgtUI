import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Guest } from 'core/model/guest';
import { GuestService } from 'guest/service/guest.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'shared/service/global/snackbar.service';

@Component({
  selector: 'available-guest',
  templateUrl: './available-guest.component.html',
  styleUrls: ['./available-guest.component.scss']
})
export class AvailableGuestComponent implements OnDestroy{

  private destroySubject: Subject<void> = new Subject();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Guest>();
  displayedColumns: string[] = [
    'guestCode',
    'firstName',
    'email',
    'checkIn',
    'numberOfDays',
    'checkOut'
  ];
  pageSizes = [5, 10];
  totalData!: number;
  isLoading = false;
  guestData!: Guest[]

  constructor(
    private _guestService: GuestService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private cdr: ChangeDetectorRef,
    ){}


  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  checkInGuest(){
    this._router.navigate(['/checkin']);
  }

  checkOutGuest(guestCode: number){
    this._router.navigate(['/checkout'], { queryParams: {code:guestCode}});
  }


  
  //Get staff data table
  getGuestList() {
    this.isLoading = true;
    this._guestService.getAvailableGuest().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.isLoading = false;
      },
     error: error => {}
    })
  }

  ngAfterViewInit() {
    this.getGuestList();
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  numberOfDays(check: Date, expire: Date) {
    let checkin = new Date(check);
    let expireDate = new Date(expire);
    return Math.floor(
      (
        Date.UTC(expireDate.getFullYear(), expireDate.getMonth(), expireDate.getDate())
         - 
        Date.UTC(checkin.getFullYear(), checkin.getMonth(), checkin.getDate()) 
      ) /(1000 * 60 * 60 * 24));
  }

  copyToClipboard(guestCode: any){
    navigator.clipboard.writeText(guestCode);

  }

}
