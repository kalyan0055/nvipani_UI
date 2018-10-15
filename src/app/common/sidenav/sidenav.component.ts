import { Component, OnInit ,EventEmitter,Output,Input  } from '@angular/core';
import { UsersService } from '../../users.service';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usertype;
  @Output() selectedpage=new EventEmitter();
  constructor(public US:UsersService,private CS:CommonService, public router:Router) { }

  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');
       
  }

  sideclick(value){
    console.log(value);
    this.selectedpage.emit(value);
    
  }

  sidebarchage(type:string){
    this.CS.selectd_page=type;
    if(type ==='dashboard'){
      this.CS.selectd_page='';
    }else{
      this.selectedpage.emit(type);
      this.router.navigate(['/dashboard/'+type]);
     }
}

}
