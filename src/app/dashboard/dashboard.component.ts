import { Component, OnInit, Injector } from '@angular/core';
import { CommonService } from '../common/common.service';
import { UsersService } from '../users.service';
import * as _ from 'underscore';
import { UserIdleService } from 'angular-user-idle';
import { Router } from '@angular/router';
import { AllServices } from '../allservices';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends AllServices implements OnInit {
  datatable = [];
  count = 0;
  public dateOfHarvest: Date = null;
  constructor(public userIdle: UserIdleService, public injector:Injector, public router: Router) {
     super(injector)
    console.log('tets');
  }

  ngOnInit() {
    
    this.getUI_Settings();
    console.log('NoOnInit called ', this.count++);
    // this.userIdle.startWatching();

    // // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count =>
    //   console.log(count)

    // );

    // // Start watch when time is up.
    // this.userIdle.onTimeout().subscribe(() => {
    //   console.log('logout');

    //   this.router.navigate(['login']);
    //   this.stopWatching();
    //   this.stop();

    // }
    // );



    // this.dateOfHarvest = new Date();
    // console.log(this.dateOfHarvest, 'before append');

    // let Wklydateofvisit = new Date().toISOString();
    // console.log(Wklydateofvisit);

    // this.dateOfHarvest = new Date(Wklydateofvisit);
    // console.log(this.dateOfHarvest, 'after append');
    // this.getUI_Settings();
  }

  getUI_Settings() {
    this.US.getUI_Settings().subscribe((res) => {
 
      let data = res.data.filter(item => item.deleted === false);
      let s = _.where(data, { ui_table: "USERS" });
      if (s.length > 0) {
        let t = s[0]['records_per_page'];
        var array = JSON.parse("[" + t + "]");
        this.datatable = [];
        this.US.datatable = [];
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          this.datatable.push(element)
          this.US.datatable.push(element)
        }
        localStorage.setItem('datatable', JSON.stringify(this.datatable));
      }
    })

  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    console.log(this.count++, 'Idle mODULE');
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  selected(value) {
       this.CS.selectd_page = value;
  }
}
