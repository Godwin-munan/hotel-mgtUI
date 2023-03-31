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
import { AuthServiceService } from './service/authentication/auth-service.service';
import { ApiServiceService } from './service/api/api-service.service';

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
];

const SERVICES: any[] = [
  AuthServiceService,
  ApiServiceService,
];

const COMPONENTS: any[] = []
const DIRECTIVES: any[] = [];
const PIPES: any[] = [];

const SCHEMAS: any[] = [ CUSTOM_ELEMENTS_SCHEMA ]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [...MODULES],
  providers: [...SERVICES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  schemas: [...SCHEMAS],
})
export class SharedModule { }
