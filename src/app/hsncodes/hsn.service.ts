import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";

@Injectable({
  providedIn: 'root'
})
export class HsnService {

  constructor(private US:UsersService) { }
  // get_hsns(pageSize,currentPage){
  //   let queryParams=`?pageSize=${pageSize}&page=${currentPage}`;
  //   let body={}
  //   return this.US.callApi(Url.API.HSN_CODES+queryParams,'get',body);
  // }
  
    get_hsns(dataparameters){
     let body=dataparameters
    return this.US.callApi(Url.API.HSN_CODES ,'post',body);
  }
  addHSN(value){
    let body=value
    return this.US.callApi(Url.API.addHSN,'post',body);
  }
  updateHSN(value){
    let body=value
    return this.US.callApi(Url.API.UPDATEHSN,'post',body);
  }

  delete_HSN(id){
  let body={_id:id}
  return this.US.callApi(Url.API.UPDATEHSN,'post',body);
  }
}
