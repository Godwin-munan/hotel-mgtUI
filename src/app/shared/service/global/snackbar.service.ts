import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'shared/component/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar: MatSnackBar,
    private zone: NgZone,
    ) { }

  openSnackBar(message: string) {
    this._snackbar.openFromComponent(SnackbarComponent, {
      data: {
        message: message
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['green-snackbar'],
    });
  }

}
