import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './settings-routings.module';
import { UiSettingsComponent } from './ui-settings.component';
import { LoaderModule } from '../common/loader.module';
import { CommonCommonModule } from '../common/common.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    LoaderModule,
    CommonCommonModule
  ],
  exports:[LoaderModule,CommonCommonModule],
  // declarations: [UiSettingsComponent ]
})
export class SettingsModule { }
