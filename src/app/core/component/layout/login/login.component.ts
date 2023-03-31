import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tokens } from 'core/model/tokens';
import { Observable } from 'rxjs';
import { AuthEndPoints } from 'shared/constants/api-constants';
import { ApiServiceService } from 'shared/service/api/api-service.service';
import { AuthServiceService } from 'shared/service/authentication/auth-service.service';
import { MyErrorStateMatcher } from 'shared/service/global/MyErrorStateMatcher';
import { UsernameValidators } from 'shared/service/global/validators/username-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  token$!: Observable<string>;

  

  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private authService: AuthServiceService){
    
    this.form = this._fb.group({
      username: ['', [Validators.required, UsernameValidators.cannotContainSpace],],
      password: ['', {
        validators: [Validators.required, Validators.maxLength(10)],
        updateOn: 'change' 
       }]
    })
  }

  get passwordControl(){
    return this.form.controls['password'];
  }

  get usernameControl(){
    return this.form.controls['username'];
  }

 togglePasswordVisibility(){
  this.showPassword = !this.showPassword;
 }

 login(){
  this.authService.getToken(this.usernameControl.value, this.passwordControl.value);
  this.token$ = this.authService.token$;
 }

 matcher = new MyErrorStateMatcher();
}
