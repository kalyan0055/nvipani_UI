import { Injectable } from '@angular/core';
import {UsersService} from '../users.service';
import { Url } from "../common/url";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UisettingsService {

  constructor(private US:UsersService,public toastr:ToastrService) { }


  saveRecordsPerPage(value){
    let body = value;
    return this.US.callApi(Url.API.SAVE_RECORDS_PER_PAGE,'post',body);
  }

  getUI_Settings(){
    let body = {};
    return this.US.callApi(Url.API.GET_UI_Settings+'/'+localStorage.getItem('userid'),'get',body);
  }

  getUI_Settings_ajax(dataparameters){
    console.log(dataparameters);
    
    let body = dataparameters;
    return this.US.callApi(Url.API.GET_UI_Settings_ajax,'post',body);
  }



  deleteSettings(id){
    let body = {};
    return this.US.callApi(Url.API.GET_UI_Settings+'/'+id,'delete',body);
  }

  toasterMessages(type, msg,title:string='') {
    switch (type) {
      case 'created': this.toastr.success(msg, 'Thank you!');
        break;
      case 'updated': this.toastr.success(msg, 'Thank you!');
        break;
      case 'error': this.toastr.error(msg, 'Error!');
        break;
      case 'deleted': this.toastr.error(msg, 'Success!');
        break;
      case 'disabled': this.toastr.info(msg, 'Success!');
        break;
        case 'saved': this.toastr.success(msg, 'Success!');
        break;
        case 'custome_success': this.toastr.success(msg, title);
        break;
        case 'custome_error': this.toastr.error(msg,title);
        break;
      default:
        break;
    }

  }
}
