import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetpasswordRoutes} from './resetpassword-routings';
import { CommonCommonModule } from '../common/common.module';
import { ResetpasswordComponent } from './resetpassword.component';

@NgModule({
  imports: [
    CommonModule,
    ResetpasswordRoutes,
    CommonCommonModule,
  ],
  exports:[CommonCommonModule],
    declarations: [ResetpasswordComponent]
})
export class ResetpasswordModule { }
 