import { Component, OnInit, ViewEncapsulation, OnDestroy, Injector, Inject } from '@angular/core';
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
//import { Router, Routes } from "@angular/router";
import { ToastrService } from 'ngx-toastr';



import swal from 'sweetalert2';
// declare var swal:any;



import { Subject } from 'rxjs';
import * as jquery from 'jquery';
import * as _ from 'underscore';
import { AllServices } from '../allservices';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-ui-settings',
  templateUrl: './ui-settings.component.html',
  styleUrls: ['./ui-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UiSettingsComponent extends AllServices implements OnInit {
  usertype: string;
  ui_settings: FormGroup;
  tableData: any = [];
  myFocusVar: boolean = false;
  delete_Data: any = null;
  update_data: any = null;

  dtOptions1: DataTables.Settings = {};
  persons = [];
  dtTrigger: Subject<any> = new Subject();
  pagelength;
  tabaleData: any = [];
  test;
  // addmore:FormGroup;
  constructor(public fb: FormBuilder, injector: Injector) {
    super(injector);
    this.usertype = localStorage.getItem('usertype');
   
  }

  ngOnInit() {

    this.ui_settings = this.fb.group({
      ui_table: [''],
      records_per_page: []
    });

    this.dtOptions1 = {
      // Configure the buttons
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        paginate: {
          first: "<<",
          last: ">>",
          next: ">",
          previous: "<"
        },
        searchPlaceholder: "Search Table Elements",

      },


      lengthMenu: [10, 20, 50, 100],
      //  lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.UIS.getUI_Settings_ajax(dataTablesParameters).subscribe(resp => {
          let filteredData = [];
          let i = 1;
          resp.data.forEach(element => {
            element['options'] = '-';
            element['sno'] = i++;
            filteredData.push(element)
          });
          this.tableData = filteredData
          //  this.tabaleData = filteredData

          callback({
            recordsTotal: this.tableData.length,
            recordsFiltered: resp.tot_count,
            data: []
          });

        });
      },

      columns: [{ title: 'SNo', name: 'sno', data: 'sno', orderable: false }, { title: 'Table Name', name: 'ui_table', data: 'ui_table' }, { title: 'Records Per Page', name: 'records_per_page', data: 'records_per_page' }, { title: 'Options', name: 'options', data: 'options', orderable: false }
      ],

    };


    // this.addmore = this.fb.group({
    //   addmorefields:this.fb.array([this.initlink()])
    // })
    // // this.getSettings();
    // this.initlink();
  }

// initlink(){
//   return this.fb.group({
//     donation:[],
//     sum:[]
//   })
// }
// addlink(){
//   const control = <FormArray>this.addmore.controls['addmorefields']
//   control.push(this.initlink())
// }
// delete_addmore(i){
//   const control = < FormArray > this.addmore.controls['addmorefields'];
//   control.removeAt(i);
// }
// formdata:any;
// tt=[];
// save(){
//   this.formdata = this.addmore.value;
//   this.tt.push(this.formdata);
//   console.log(this.formdata);
// }
// updateform(){
//   console.log(this.tt);
//   console.log(this.tt[0].addmorefields);
  
  
//  this.addmore.patchValue({addmorefields:this.tt[0].addmorefields});
// }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  resetdata() {
    this.ui_settings.reset();
    this.delete_Data = null;
    this.update_data = null;
  }
  saveSettings() {
    let obj = {};
    obj = Object.assign({}, this.ui_settings.value)
    if (this.update_data && this.update_data != null) {
      obj = Object.assign({}, this.ui_settings.value, { _id: this.update_data._id })
    }
    this.UIS.saveRecordsPerPage(obj).subscribe((Res) => {
      if (Res.status) {
        (this.update_data && this.update_data != null) ? this.UIS.toasterMessages('updated', Res.message) : this.UIS.toasterMessages('created', Res.message);
        this.commonFunction();
      } else {
        this.UIS.toasterMessages('error', 'in Saving/Updating');
      }
    })

  }




  update(t) {
    this.update_data = t;
    this.ui_settings.patchValue(t);
  }


  delete(t) {
    this.UIS.deleteSettings(t._id).subscribe((Res) => {
      if (Res.status) {
        localStorage.removeItem('datatable');
        this.US.datatable = [];
        this.UIS.toasterMessages('deleted', Res.message);
        this.commonFunction();
      } else {
        this.UIS.toasterMessages('error', Res.message);
      }
    })
  }



  commonFunction(type: any = '', msg: any = '') {
    this.resetdata();
    //  this.toasterMessages(type, msg);
    // this.getSettings();
    // this.US.getUI_Settings();
  }
}
