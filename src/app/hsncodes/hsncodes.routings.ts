import {Routes,RouterModule} from '@angular/router';
import { HsncodesComponent } from './hsncodes.component';
import { NgModule, ModuleWithProviders } from '@angular/core';


const hroutes:Routes=[
    {
        path:'', component:HsncodesComponent  
    }
]

export const hsnroutes:ModuleWithProviders = RouterModule.forChild(hroutes); 

 
 
// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {RouterModule,Routes} from '@angular/router';
// import { UiSettingsComponent } from './ui-settings.component';
 
// const routes : Routes=[
//   {path:'',component:UiSettingsComponent}
// ];

// //export class SettingsRoutingsModule { }
// export const routing: ModuleWithProviders = RouterModule.forChild(routes);