import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../common/loader.module';
import { CommonCommonModule } from '../common/common.module';
import { userActivities } from './user-activities.routings';
 

@NgModule({
  imports: [
    CommonModule,
    userActivities,
    LoaderModule,
    CommonCommonModule
  ],
  // declarations: [UserActivitiesComponent],
  exports:[LoaderModule,CommonCommonModule],
})
export class UserActivitiesModule { }

 

 
