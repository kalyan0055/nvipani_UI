import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hsnroutes } from "./hsncodes.routings";
import { HsncodesComponent } from './hsncodes.component';
import { LoaderModule } from '../common/loader.module';
import { CommonCommonModule } from '../common/common.module';

 
@NgModule({
  imports: [
    CommonModule,
    hsnroutes,
    CommonCommonModule,
    LoaderModule
  ],
  //declarations: [HsncodesComponent],
  exports:[CommonCommonModule,LoaderModule]

})
export class HsncodesModule { }
 
