import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserActivitiesService {

  constructor(private US:UsersService) { }

  getActivities(value){
    let body = value;
    return this.US.callApi(Url.API.GET_ACTIVITIES,'post',body);
  }


  getActivitiesByType(value){
    let body = value;
    return this.US.callApi(Url.API.GET_ACTIVITIES_BY_TYPE,'post',body); 
  }


}
