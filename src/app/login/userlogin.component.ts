import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { AuthenticationService } from "../common/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';
import { AllServices } from '../allservices';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent extends AllServices implements OnInit {
  model: any = { username: '', password: '' }
  password_status = false;
  loginForm: FormGroup;
  hide = true;

  constructor(public router: Router,public injector:Injector) {
    super(injector)
   }

  ngOnInit() {
    localStorage.clear();

  }
  register() {
    this.router.navigate(['userlogin'])
  }
  onSubmit() {
    this.Auth.login(this.model).subscribe((res) => {
      if (res.success || res.status) {
        let msg = 'Hi ' + (res.data.username).substr(0, res.data.username.length - 12).toUpperCase();
        this.US.userlogin = true;
        localStorage.setItem('name', res.data.username)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('token', res.token)
        localStorage.setItem('profileImageURL', res.data.profileImageURL)
        localStorage.setItem('userid', res.data._id)
        localStorage.setItem('usertype', res.data.userType)
        this.US.userdata = localStorage.setItem('userInfo', JSON.stringify({ firstName: res.data.firstName, lastName: res.data.lastName, middleName: res.data.middleName, mobile: res.data.mobile, displayName: res.data.displayName }));
        this.US.userdata = res.data;
        this.toastr.success(msg, 'Welcome');
        this.saveActivity();
        this.router.navigate(['dashboard']);
      }
      else {
        this.toastr.error(res.message, 'Failed...');
      }
    })
  }

  saveActivity(){
    let data={};
    data= Object.assign({},this.CS.defaultObj,{name:this.CS.getMessage('Login',null,null),eventTargetType:'User',lastUpdatedUser:null})
      this.CS.saveActivity(data).subscribe((res)=>{
        if(res.status){
          console.log('User login activity saved');
        }else{
          console.log('User login activity saving failed');
        }
      })
  }


}
