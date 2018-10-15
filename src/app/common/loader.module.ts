import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';
import { CommonCommonModule } from './common.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../adminusers/users.component';
import { UiSettingsComponent } from '../ui-settings/ui-settings.component';

@NgModule({
  imports: [
    CommonCommonModule,
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    UiSettingsComponent],
  exports: [
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    UiSettingsComponent,
    CommonCommonModule
  ]
})
export class LoaderModule { }
