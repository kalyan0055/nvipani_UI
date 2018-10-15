import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { UiSettingsComponent } from './ui-settings.component';
 
const routes : Routes=[
  {path:'',component:UiSettingsComponent}
];

//export class SettingsRoutingsModule { }
export const routing: ModuleWithProviders = RouterModule.forChild(routes);

// import { ModuleWithProviders } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { LazyComponent } from './lazy.component';

// const routes: Routes = [
//   { path: '', component: LazyComponent }
// ];

// export const routing: ModuleWithProviders = RouterModule.forChild(routes);