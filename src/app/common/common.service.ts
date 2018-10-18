import { Injectable } from '@angular/core';
import { Url } from './url';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  selectd_page = null;
  activityObj = {
    name: null,
    target: null,
    eventType: null,
    eventTargetType: null,
    user: null
  }

  defaultObj = {
    name: null,
    target: null,
    eventType: 'List',
    eventTargetType: null,
    user: localStorage.getItem('userid'),
  }


  constructor(public US: UsersService) {

  }

  saveActivity(value) {
    return this.US.callApi(Url.API.SAVE_ACTIVITY, 'post', value)
  }

  getMessage(key, type,data) {
    let date = new Date();
    switch (key) {

      case 'LogOut': return ('User Logged out at' + date);
        break;
      case 'Login': return ('User Logged in at' + date);
        break;
      case 'Add': return ('Added - ' + type);
        break;
      case 'Edit': return ('Updated - ' + type);
        break;
      case 'Delete': return (type + 'Deleted');
        break;
      case 'Disable': return type + 'Added - ';
        break;
      case 'View': return 'Viewed about - ' + type;
        break;
      case 'List': return 'Viewed  - ' + type + ' List Page';
        break;
      case 'Search': return `Searched for ${data}` + type;
        break;
      default:
        break;
    }
  }
}
