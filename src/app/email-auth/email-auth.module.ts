import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMailRoutes } from './email-routings';
import { EmailAuthComponent } from './email-auth.component';
import { CommonCommonModule } from '../common/common.module';
 
@NgModule({
  imports: [
    EMailRoutes,
    CommonCommonModule,
    CommonModule
  ],
  exports:[CommonCommonModule],
  declarations: [EmailAuthComponent]
})
export class EmailAuthModule { }

 
 

 