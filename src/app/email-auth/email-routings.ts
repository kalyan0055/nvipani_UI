import {Routes,RouterModule} from '@angular/router';
import { EmailAuthComponent } from './email-auth.component';
 
import { ModuleWithProviders } from '@angular/compiler/src/core';
 
const emailroutes:Routes=[
    {path:'',component:EmailAuthComponent},  
]

export const EMailRoutes :ModuleWithProviders = RouterModule.forChild(emailroutes)
 