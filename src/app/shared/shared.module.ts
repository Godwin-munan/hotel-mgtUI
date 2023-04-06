import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './service/authentication/auth-service.service';
import { ApiService } from './service/api/api-service.service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'env/environment';
import { AuthGuard } from './service/authentication/auth-guard.guard';
import { AuthInterceptorProvider } from './Interceptor/auth-interceptor.interceptor';
import { AdminGuard } from './service/authentication/admin-guard.guard';
import { TestComponent } from './component/test/test.component';
import { ShiftService } from './service/global/shift.service';
import { JobService } from './service/global/job.service';
import { IdCardService } from './service/global/id-card.service';
import { GenderService } from './service/global/gender.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  NgbModule,
  HttpClientModule,
  BrowserModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: [environment.domain],
      disallowedRoutes: [],
    },
  }),
];

const SERVICES: any[] = [
  AuthService,
  ApiService,
  AuthGuard,
  AdminGuard,
  AuthInterceptorProvider,
  ShiftService,
  JobService,
  IdCardService,
  GenderService,
 
];

const COMPONENTS: any[] = []
const DIRECTIVES: any[] = [];
const PIPES: any[] = [];

const SCHEMAS: any[] = [ CUSTOM_ELEMENTS_SCHEMA ]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES, TestComponent],
  imports: [...MODULES],
  providers: [...SERVICES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  schemas: [...SCHEMAS],
})
export class SharedModule { }
