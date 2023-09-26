import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { startLogin } from '@hotelmgt/store/index';
import { Store } from '@ngrx/store';
import { LoginInfo } from 'core/model/login-info';
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

  isLoading$: Observable<boolean>;
  
  form!: FormGroup;
  error!: boolean;

  

  showPassword: boolean = false;

  constructor(
    private _fb: FormBuilder, 
    private _authService: AuthService, 
    private _store: Store,

    ){
    
    this.form = this._fb.group({
      username: ['', [Validators.required, UsernameValidators.cannotContainSpace],],
      password: ['', {
        validators: [Validators.required, Validators.maxLength(10), UsernameValidators.cannotContainSpace],
        updateOn: 'change' 
       }]
    })

    this.isLoading$ = this._authService.isLoading$;
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
  
  this._authService.login(this.usernameControl.value, this.passwordControl.value);

  let credential = {
    username: this.usernameControl.value,
    password: this.passwordControl.value } as LoginInfo

  this._store.dispatch(startLogin({credential}));

  this._authService.errorStatus$.pipe(
    takeUntil(this.destroySubject)
  ).subscribe(error => this.error = error)
 }

 matcher = new MyErrorStateMatcher();
}
