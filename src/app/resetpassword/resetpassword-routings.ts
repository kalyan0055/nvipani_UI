import{RouterModule,Routes} from '@angular/router';
import { ResetpasswordComponent } from './resetpassword.component';
import { ModuleWithProviders } from '@angular/core';

const resetpassword : Routes=[
    { path:'',component:ResetpasswordComponent}
]

export const ResetpasswordRoutes : ModuleWithProviders = RouterModule.forChild(resetpassword);

 
 