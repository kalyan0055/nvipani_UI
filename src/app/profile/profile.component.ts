import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { UserserviceService } from "../adminusers/userservice.service";
import { ProfileService } from 'src/app/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: FormGroup;
  profile_img: FormGroup;
  pview = true;
  nopic = true;
  userdata: any;
  url = environment.url;
  profileImageURL: string;
  email: any;
  constructor(private fb: FormBuilder, public UPLOAD: UploadService, public US: UserserviceService, public PS: ProfileService, private toastr: ToastrService) {
    this.userdata = JSON.parse(localStorage.getItem('userInfo'))
    this.profileImageURL = localStorage.getItem('profileImageURL');
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
    this.profile = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      mobile: [],
      displayName:[]
    })
    this.profile_img = this.fb.group({
      file: [''],
    })
  }


  update() {
    this.profile.patchValue(this.userdata)
  }

  updatePrfile() {
    let body = {}
    body = Object.assign({}, this.profile.value, { username: localStorage.getItem('email') });
    this.PS.updateProfile(body).subscribe((res) => {
      if (res) {
        localStorage.setItem('userInfo',JSON.stringify({firstName:this.profile.value.firstName,lastName:this.profile.value.lastName,middleName:this.profile.value.middleName,mobile:this.profile.value.mobile,displayName:this.profile.value.displayName}));
        this.userdata =  JSON.parse(localStorage.getItem('userInfo'))
        this.pview =true;
        
        // this.userdata['firstName'] = this.profile.value.firstName;
        // this.userdata['middleName'] = this.profile.value.middleName;
        // this.userdata['lastName'] = this.profile.value.lastName;
        // this.userdata['displayName'] = this.profile.value.displayName;
        this.toastr.success('Profile Update Successfully', 'success')
      } else {
        this.toastr.warning('Profile Update Successfully', 'success')
      }
    })
  }


  imagepriview: any;
  files;
  onChange(event) {
    const value = (event.target as HTMLInputElement).files[0];
    this.files = event.srcElement.files;
    this.profile_img.get('file').updateValueAndValidity();
    let reader = new FileReader();
    reader.onload = () => {
      this.imagepriview = reader.result
    }
    reader.readAsDataURL(value);
  } 

  fileupload() {
    this.UPLOAD.makeFileRequest('http://192.168.0.113:8082/users/profilePicture', this.files).subscribe(
      (Res) => {
        let data = JSON.parse(Res);
        localStorage.setItem('profileImageURL', `modules/users/img/profile/uploads/${data.path}`);
        this.profileImageURL = localStorage.getItem('profileImageURL');
        this.toastr.success('Profile Photo Updated Successfully', 'Success');
        this.nopic = true
      })
  }
  fileupload_reset(){
    this.imagepriview='';
  }
}
