import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'shared/service/authentication/auth-service.service';
import { MyErrorStateMatcher } from 'shared/service/global/MyErrorStateMatcher';
import { UsernameValidators } from 'shared/service/global/validators/username-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private destroySubject: Subject<void> = new Subject();
  
  form!: FormGroup;
  error!: boolean;

  

  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, public authService: AuthService){
    
    this.form = this._fb.group({
      username: ['', [Validators.required, UsernameValidators.cannotContainSpace],],
      password: ['', {
        validators: [Validators.required, Validators.maxLength(10), UsernameValidators.cannotContainSpace],
        updateOn: 'change' 
       }]
    })
  }
  
  ngOnDestroy(){
    this.destroySubject.next();
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
  this.error = false;
  this.authService.login(this.usernameControl.value, this.passwordControl.value);
  this.authService.errorStatus$.pipe(
    takeUntil(this.destroySubject)
  ).subscribe(error => this.error = error)
 }


 matcher = new MyErrorStateMatcher();
}
