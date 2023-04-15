import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTable } from '../../user-table';
import { SnackbarService } from 'shared/service/global/snackbar.service';
import { AppUserService } from '../../services/app-user.service';
import { AppUser } from 'core/model/app-user';
import { RoleTable } from 'shared/service/global/role-table';
import { Observable } from 'rxjs';
import { RoleService } from 'shared/service/global/role.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  userForm: FormGroup;
  roleList$: Observable<RoleTable[]>;

  constructor(
    private _fb: FormBuilder,
    private _snackbar: SnackbarService,
    private _userService: AppUserService,
    private _roleService: RoleService,
    private _dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserTable,
    ){

    this.roleList$ = this._roleService.roleList$;

    this.userForm = this._fb.group({
      id: [''],
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required,]],
      username: ['', [Validators.required,]],
      password: ['', []],
      roleId: ['', [Validators.required,]],

    })
  }
  

  ngOnInit(): void {
    if(this.data){
      let user = this.data as UserTable;

      this.userForm.patchValue({
        roleId: this.data.role.id
      })
     
      this.userForm.patchValue(user);
    }
    
  }

  

  onFormSubmit(){
    if(this.userForm.valid){

      if(this.data){
        let user = this.mapFormToUpdateUser(this.userForm.value);

        this._userService.updateUser(user).subscribe({
          next: () => {
            this._snackbar.openSnackBar('User updated successfully');
            this._dialogRef.close(false);
          },
          error: error => {}
        });

      }else{
        let user = this.mapFormToAddUser(this.userForm.value)

        this._userService.addUser(user)
        .subscribe({
          next: () => {
            this._snackbar.openSnackBar('User added successfully');
            this._dialogRef.close(false);
          },
          error: error => {}
        });
      }
    }
    
  }

  mapFormToUpdateUser(user: any){
    
    return new AppUser(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.password,
      [this._roleService.findStorageRoleById(user.roleId)]
    );
  }

  mapFormToAddUser(user: any){

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      roleIds: [user.roleId]
    }
   
  }
}
