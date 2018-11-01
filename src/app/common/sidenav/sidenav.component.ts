import { Component, OnInit ,EventEmitter,Output,Input  } from '@angular/core';
import { UsersService } from '../../users.service';
import { CommonService } from '../../common/common.service';
import { Router,ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usertype;
  sub:any;
  @Output() selectedpage=new EventEmitter();
  constructor(public US:UsersService,private CS:CommonService, public router:Router, private route: ActivatedRoute,) {
// this.sub = this.route.params.subscribe(params => {
//       let id = params.id1// (+) converts string 'id' to a number
//       let username =params.id2;
//       let otp = params.id3
//     console.log(id,'first param',username,'next param');
//    });
console.log(this.router.url.substr(1));
this.CS.selectd_page = this.router.url.substr(1);
   }

  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');
  }

   
  sidebarchage(type:string){
    this.CS.selectd_page=type;
    if(type ==='dashboard'){
      this.CS.selectd_page='';
    }else{
       this.selectedpage.emit(type);
       this.router.navigate([type]);
     }
  }

}
