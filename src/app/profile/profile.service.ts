// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private US:UsersService) { }
  updateProfile(value){
     return this.US.callApi(Url.API.UPDATE_PROFILE,'put',value);
  }
  changeProfilePicture(value){
    return this.US.callApi(Url.API.CHANGE_PROFILE,'post',value);
 }
 
}