import {Routes,RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { UserActivitiesComponent } from './user-activities.component';

const userActivity:Routes =[
    {path:'',component:UserActivitiesComponent}
]

export const userActivities : ModuleWithProviders = RouterModule.forChild(userActivity)