import { Component,  OnInit ,EventEmitter,Output,Input  } from '@angular/core';
import { UserserviceService } from "../../adminusers/userservice.service";
import {Router} from '@angular/router';
import { CommonService } from '../../common/common.service';
import { UsersService } from '../../users.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headername;
  usertype;
  public datatable = [];
  @Output() selectedpage=new EventEmitter();
  constructor(public US:UserserviceService,private CS:CommonService, public router:Router,public USS:UsersService) {
  
   }
  
  
  ngOnInit() {
    this.getUI_Settings();
    console.log(this.US.userdata);
    console.log(this.US.userdata.username);
    this.usertype = localStorage.getItem('usertype');
    this.headername = localStorage.getItem('name').substr(0, localStorage.getItem('name').length - 12)
  }

  logout(){
    this.US.userlogin = false;

    
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

 
  sideclick(value){
    console.log(value);
    this.CS.selectd_page = value;
    this.selectedpage.emit(value);
    this.router.navigate(['profile']);
  }

  getUI_Settings(){
    this.USS.getUI_Settings().subscribe((res) => {
     let data = res.data.filter(item => item.deleted === false);
     console.log(data,'at headers');
     
     let s = _.where(data, { ui_table: "USERS" });
     if(s.length > 0){
       let t = s[0]['records_per_page'];
       var array = JSON.parse("[" + t+ "]");
       this.datatable = [];
       this.USS.datatable =[];
       for (let i = 0; i < array.length; i++) {
         const element = array[i];
         this.datatable.push(element)
         this.USS.datatable.push(element)  
       }
       
        localStorage.setItem('datatable', JSON.stringify(this.datatable));
     }
     

    })
 }
}
