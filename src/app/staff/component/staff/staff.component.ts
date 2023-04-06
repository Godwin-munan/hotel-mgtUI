import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from '../add-staff/add-staff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {

  constructor(private _dialog: MatDialog){}

  openAddStaffForm(){
    this._dialog.open(AddStaffComponent)
  }

}
