import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { HeaderComponent } from './component/layout/header/header.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { MainLayoutComponent } from './component/layout/main-layout/main-layout.component';
import { LoginComponent } from './component/layout/login/login.component';
import { HomeComponent } from './component/home/home.component';

const COMPONENTS: any[] = [MainLayoutComponent]
@NgModule({
  declarations: [ ...COMPONENTS,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [...COMPONENTS]
})
export class CoreModule { }
