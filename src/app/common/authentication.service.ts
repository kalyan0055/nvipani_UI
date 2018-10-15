import { Injectable, COMPILER_OPTIONS } from '@angular/core';
import { UserserviceService } from "../adminusers/userservice.service";
import { Url } from "../common/url";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private US:UserserviceService) { }

  login(value){
    ///users/login
    //auth/signin 'http://localhost:8081/auth/signin'
  return this.US.callApi(Url.API.SIGNIN,'post',value);
  }
  
  confirmRegistration(value){
    return this.US.callApi(Url.API.CONF_REGISTRATION,'post',value);
  }
  resetPassword(value){
    return this.US.callApi(Url.API.RESET_PASSWORD,'post',value);
  }
}
