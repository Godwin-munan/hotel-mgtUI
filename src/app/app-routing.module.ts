import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserComponent } from 'core/component/layout/app-user/app-user.component';
import { LoginComponent } from 'core/component/layout/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AppUserComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
