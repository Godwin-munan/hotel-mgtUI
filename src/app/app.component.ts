import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
 
  constructor(private jwt: JwtHelperService){
    const token = "eyJraWQiOiI4ZDZjOTkzMy04YWEwLTQ4OWQtYjM4Zi03YzJlNDExNjhkNGEiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJGaXRuZXNzVHJhY2tlciIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTY4NzQ3NjQzNiwiaWF0IjoxNjg3NDQwNDM2LCJzY29wZSI6WyJ1c2VyOnJlYWQiLCJ1c2VyOmNyZWF0ZSIsInVzZXI6dXBkYXRlIiwidXNlcjpkZWxldGUiXX0.DH3aHJExP6Xi6uirceogQ5-PbGGM7QZ0TjxL_M9eZkAeVfD6M20kfYlIArzXIsRS_JTU7KnddX3hoqDorPR94I-xo5ngiYFdwU_5_mdKvlBkOO0r0BZh7kHTKVkqi8mzqi2DV370fcp8NO2hkEEa9SXCRvQrWpL32hOCA8o50MH0s5Fv2NoWTR8hUgAq7n_086_MSadjzUFit5wgy0kj4No0oUtzawsoAIVQbg-QHHDbM2WPtAqUuM2yZT4pyS8fTKPZ_yHX7CyKe3pX25S2gWB22ZdIST1dwleoZXH37vF_D_ATkgOUUtF3AjrUcJmMWBafAUkJlmkVKIeckS5N4Q"
    console.log(jwt.decodeToken(token))
  }
  
}
