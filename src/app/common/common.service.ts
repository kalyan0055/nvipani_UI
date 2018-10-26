import { Injectable } from '@angular/core';
import { Url } from './url';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  selectd_page = 'users';
  activityObj = {
    name: null,
    target: null,
    eventType: null,
    eventTargetType: null,
    user: null
  }

  defaultObj = {
    name: null,
    eventType: 'Accessed',
    eventTargetType: null,
    user: localStorage.getItem('userid'),
   

  }


  constructor(public US: UsersService) {

  }

  saveActivity(value) {
    return this.US.callApi(Url.API.SAVE_ACTIVITY, 'post', value)
  }

  getMessage(key, type, data) {
    let date = new Date();
    let msg = null
    switch (key) {
      case 'LogOut': msg = 'User Logged out at' + date;
        break;
      case 'Login': msg = 'User Logged in at' + date;
        break;
      case 'Add': msg = 'Added - ' + type;
        break;
      case 'Edit': msg = 'Updated - ' + type;
        break;
      case 'Delete': msg = data.username + '-' + ' is Deleted';
        break;
      case 'Disable': msg = data.username + '-' + ' is Disabled';
        break;
      case 'View': msg = 'Viewed recored  - ' + data.username  + ' in '+ type;
        break;
      case 'Accessed': msg = 'Accessed  - ' + type + ' List Page';
        break;
      case 'Search': msg = `Searched in ${type} table - ` + data;
        break;
      default:
        break;
    }
    return msg;
  }
}
