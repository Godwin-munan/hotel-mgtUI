import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { HeaderComponent } from './component/layout/header/header.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { AppUserComponent } from './component/layout/app-user/app-user.component';
import { LoginComponent } from './component/layout/login/login.component';

const COMPONENTS: any[] = [AppUserComponent]
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AppUserComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [...COMPONENTS]
})
export class CoreModule { }
