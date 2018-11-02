import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, Injector } from '@angular/core';
import {
  FormArray, Form, FormControlName, FormGroup, FormBuilder, NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { speedDialFabAnimations } from './fab-animations';
import swal from 'sweetalert2';
// declare var swal:any;
import * as jquery from 'jquery';
import * as _ from 'underscore';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;

import { AllServices } from '../allservices';
import { isObject } from 'util';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: speedDialFabAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent extends AllServices implements OnInit, OnDestroy {
  profile: FormGroup;
  REG_FORM1: FormGroup;
  loginForm1: FormGroup;
  formData: FormData;

  hide = true;
  nvipani = false;
  update_status = false;
  test;
  emailerror = false;
  loading: boolean;
  loading1 = false;
  //TABLE DATA
  tabaledata: any = [];
  tabledata: any;
  tabledata1: any;
  tabledata2: any;
  //Table Data end


  //For POP UPS DATA
  delete_Data;
  disable_Data;
  reset_Data;
  usertype;
  type: string = null;
  s_buttons: boolean = false;
  selected_type = 'All Users';
  //FAB BUTTONS 
  fabButtons = [
    {
      icon: 'create',
      edit: (param) => { this.edit_visible(param) },
      tooltip: "Delete User"
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';
  //FAB Buttons end
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();
  pagelengths;
  updated_by: any = '';

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  userData: any = null;
  constructor(public fb: FormBuilder, injector: Injector) {
    super(injector);
    this.usertype = localStorage.getItem('usertype');
    // console.log(this.US.datatable, 'from service');
    // console.log(this.pagelength, 'page length');
    this.pagelengths = this.US.datatable;
    // console.log(this.pagelength, 'page length');
    // this.AUTOLOGOUT.initListener();
    // this.s = localStorage.getItem('datatable');
    // console.log(this.usertype,'datatable');
    // console.log(this.s,'datatable');
    // var array = JSON.parse(this.s);
    // if (this.s) {
    //   for (let i = 0; i < array.length; i++) {
    //     const element = array[i];
    //     this.pagelength.push(element)
    //   }
    // }




  }



  ngOnInit() {
    this.US.userlogin = false;
    this.loginForm1 = this.fb.group({
      image: ['']
    })
    this.REG_FORM1 = this.fb.group({
      username: ['', Validators.required]
    })
    this.profile = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      mobile: ['', Validators.required]
    })
    //  this.getNewUsers();

    this.dtOptions = {
      // Configure the buttons
      pagingType: 'simple_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        paginate: {
          first: "First",
          last: "Last",
          next: "Next",
          previous: "Previous"
        },
        searchPlaceholder: "Search Table Elements",

      },
      lengthMenu: (this.US.datatable.length > 0) ? this.pagelengths : [10, 20, 50, 100],
      //  lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.US.getNewUsers(dataTablesParameters).subscribe(resp => {
          let filteredData = []; resp.data.forEach(element => {
            (element.displayName === '' || element.displayName === undefined) ? element.displayName = '-' : element.displayName = element.displayName;
            (element.mobile === '' || element.mobile === undefined) ? element.mobile = '-' : element.mobile = element.mobile;
            element['options'] = '-';
            filteredData.push(element)
          });
          console.log(dataTablesParameters, 'searchhhh');

          if (dataTablesParameters.search.value) {

            this.saveActiivty('Search', dataTablesParameters.search.value)
          }
          
          this.tabaledata = filteredData
          this.tabledata1 = filteredData
          this.tabledata2 = filteredData;
          this.tabledata = filteredData;
          callback({
            recordsTotal: this.tabaledata.length,
            recordsFiltered: resp.tot_count,
            data: this.tabaledata
          });
        
        });
      },
      // initComplete: function () {
      //   this.api().columns().every(function () {
      //     var column = this;
      //     console.log(column);
          
      //     var select = $('<select><option value=""></option></select>')
      //       .appendTo($(column.footer()).empty())
      //       .on('change', function () {
      //         var val = $.fn.dataTable.util.escapeRegex(
      //           $(this).val()
      //         );

      //         column
      //           .search(val ? val : '', false, false)
      //           .draw();
      //       });

      //     column.data().unique().sort().each(function (d, j) {
      //       select.append('<option value="' + d + '">' + d + '</option>')
      //     });
      //   });
      // },

      columns: [{ title: 'Name', name: 'displayName', data: 'displayName' }, { title: 'E-Mail', name: 'email', data: 'email' }, { title: 'Mobile', name: 'mobile', data: 'mobile' },
      { title: 'UserType', name: 'userType', data: 'userType' }, { title: 'Actions', name: 'options', data: 'options', orderable: false }],

    };

    this.saveActiivty('Accessed', null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }

  reloadTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  // getNewUsers() {
  //   this.loading = true;
  //   this.US.getNewUsers(null).subscribe((res) => {
  //     console.log(res);
  //     if (res.status) {
  //       this.tabledata = res.data.filter(item => item.username != 'info@nvipani.com');
  //       this.tabledata1 = res.data.filter(item => item.username != 'info@nvipani.com');
  //       this.tabledata2 = res.data.filter(item => item.username != 'info@nvipani.com');
  //       this.tabaledata = res.data.filter(item => item.username != 'info@nvipani.com');
  //       this.pagelength.push(res.tot_count)
  //       this.loading = false;
  //     } else {
  //       this.tabaledata = [];
  //       console.log(this.tabaledata.length);
  //       this.loading = false;
  //     }
  //   })
  // }

  reset_form() {
    this.REG_FORM1.reset();
  }
  getErrorMessage() {
    return this.REG_FORM1.controls['username'].hasError('required') ? 'You must enter a nvipani mail' :
      this.REG_FORM1.controls['username'].hasError('username') ? 'Not a valid email' :
        '';
  }

  updateId: string = null;
  oldData: any = null
  edit_visible(value: any = '') {
    console.log(value);
    this.updateId = value._id;
    this.updated_by = value.username
    this.US.get_User(this.updateId).subscribe((res) => {
      if (res.status) {
        this.profile.patchValue(res.userData);
        this.update_status = true;
        this.oldData = res.userData;
      } else {
        this.profile.reset();
        this.update_status = false;
        this.oldData = null;
        this.updateId = null;
      }
    })

  }

  updatePrfile() {
    let body = {}
    body = Object.assign({}, this.profile.value, { username: this.updated_by, _id: this.updateId });
    this.loading1 = true;
    this.PS.updateProfile(body).subscribe((res) => {
      if (res) {
        this.loading1 = false;
        this.update_status = !this.update_status;
        this.profile.reset();
        this.reloadTable()
        this.updated_by = null;
        this.update_status = false;
        this.updateId = null
        // if (obj && isObject(obj)) {
        //   _.map(obj, function (value, key) {
        //     effectedData.push({ column: key, newData: value, oldData: '' })
        //   });
        //   data['effectedData'] = effectedData
        // }
        let effectedData = { column: null, newData: body, oldData: this.oldData }
        this.toastr.success('User Updated Successfully', 'success');
        this.saveActiivty('Edit', effectedData)
      } else {
        this.loading1 = false;
        this.toastr.warning('Error in Updating User', 'error')
      }
    })
  }

  onSearchChange(value) {
    var trigger = value,
      regexp = new RegExp('@nvipani.com');
    this.test = regexp.test(trigger);
    if (!this.REG_FORM1.valid || !this.test) {
      this.emailerror = true;
    } else {
      this.emailerror = false;
    }
  }

  findUser() {
    this.US.findUser({ username: this.REG_FORM1.value.username }).subscribe((res) => {
      // this.loading1= true;
      if (res.data == 'Register Request') {
        this.swal_Alert();
      } else if (res.data == 'Register Request') {
        this.toastr.error(res.message, 'Error!');
      } else {
        this.nvi_onSubmit();
      }
    })
  }

  swal_Alert() {
    let that = this;
    swal({
      type: 'warning',
      title: 'Registration request already Sent?',
      text: 'Are you sure to resend registration request mail',
      showCancelButton: true,
      confirmButtonText: 'Yes, Please!',
      cancelButtonText: 'No',
      confirmButtonColor: '#049F0C',
      cancelButtonColor: '#ff0000',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        that.nvi_onSubmit();
      }
    });
  }

  nvi_onSubmit() {
    //  console.log(this.REG_FORM1.value);
    let body = {};
    body = Object.assign({}, this.REG_FORM1.value, { issendotp: true, issendemail: true });
    this.loading1 = true;
    this.US.regViaemail(body).subscribe((res) => {
      if (res.status) {
        this.loading1 = false;
        this.toastr.success('Registration Requst Sent to -' + `${this.REG_FORM1.value.username}`, 'Thank you!');
        this.reloadTable();
        let data = { name: this.REG_FORM1.value.username, target: res.user._id };
        let obj = _.pick(res.user, 'username', 'email', 'status', 'emailOtp')
        let effectedData = [];
        if (obj && isObject(obj)) {
          _.map(obj, function (value, key) {
            effectedData.push({ column: key, newData: value, oldData: '' })
          });
          data['effectedData'] = effectedData
        }
        this.saveActiivty('Add', data);
        this.nvipani = false;
      } else {
        this.loading1 = false;
        this.toastr.error(res.message, 'Error!');
      }
    })
  }

  delete(t) {
    this.loading1 = true;
    console.log(t);
    this.US.delete_User(t._id).subscribe((res) => {
      if (res.status) {
        this.loading1 = false;
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        this.reloadTable()
        this.delete_Data = null;
        this.saveActiivty('Delete', t)
      } else {
        this.loading1 = false;
        this.toastr.warning(res.message, 'Error');
      }
    });
  }

  del_pop_msg: string = '';
  delete_popup(t, type) {

    this.del_pop_msg = type;
    document.getElementById('delete').click();
    this.delete_Data = t;
  }

  restore(t) {
    this.loading1 = true;
    this.US.restore(t._id).subscribe((res) => {
      if (res.status) {
        this.loading1 = false;
        this.toastr.success('Successfully Restored!', 'Thank you!');
        this.reloadTable()
        this.delete_Data = null;
      } else {
        this.loading1 = false;
        this.toastr.warning('Unable to Restore', 'Error');
      }
    });
  }


  disable(t) {
    this.loading1 = true;
    if (this.type != null) {
      this.US.disable_User(t._id, this.type).subscribe((res) => {
        if (res.status) {
          this.loading1 = false;
          this.toastr.success('Successfully ' + `${this.type}d`, 'Thank you!');
          this.reloadTable()
          this.disable_Data = null;
          this.saveActiivty('Disable', t)
        } else {
          this.loading1 = false;
          this.toastr.warning('Unable to ' + `${this.type}d`, 'Error');
        }
      });
    }
  }

  disable_popup(t, type) {
    this.type = type;
    this.disable_Data = t;
  }

  reset_popup(t) {
    this.reset_Data = t;
  }

  reset_pwd_Data: object;
  resetPassword(t) {
    this.reset_pwd_Data = {
      id: this.tabaledata[this.tabaledata.indexOf(t)]._id,
      reset_password: this.tabaledata[this.tabaledata.indexOf(t)].reset_password,
      username: this.tabaledata[this.tabaledata.indexOf(t)].email
    }

    if (this.reset_pwd_Data != null && Object.keys(this.reset_pwd_Data).length > 0) {
      this.loading1 = true;
      this.US.sendPasswordLink(this.reset_pwd_Data).subscribe((res) => {
        if (res.status) {
          this.loading1 = false;
          this.toastr.success('Password Reset Requst Sent to -' + `${this.reset_pwd_Data['username']}`, 'Thank you!');
          this.reloadTable();
          this.reset_pwd_Data = {};
        } else {
          this.loading1 = false;
          this.toastr.warning('Password Reset Requst Sent ', 'Error!');
        }
      })
    } else {
      this.toastr.warning('Please check once', 'error!');
    }
  }


  filterUsers(type: string) {
    (type === 'Adminuser') ? this.selected_type = 'Admins' : (type === 'User') ? this.selected_type = 'Users' : this.selected_type = 'All Users';
    switch (type) {
      case 'allusers': this.tabaledata = this.tabledata;
        break;
      case 'Adminuser': this.tabaledata = this.tabledata1.filter(item => item.userType === type);
        break;
      case 'User': this.tabaledata = this.tabledata2.filter(item => item.userType === type)
        break;
      default: this.tabaledata = this.tabledata;
        break;
    }
    (type === 'allusers') ? this.tabaledata = this.tabledata : this.tabaledata = this.tabaledata.filter(item => item.userType === type);
  }


  viewUser(value) {
    this.userData = value;
    this.saveActiivty('View', value);
  }

  saveActiivty(type: string, value: any = '') {
    let data = {};
    console.log(value, 'value');

    switch (type) {
      case 'Accessed': data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('Accessed', 'Users', null), eventTargetType: 'User' });
        break;

      case 'Add': data = Object.assign({}, this.CS.defaultObj, {
        name: this.CS.getMessage('Add', `NewUser - ${value.name}`, null), eventType: 'Add', eventTargetType: 'User', target: value.target, effectedData: value.effectedData
      });
        break;

      case 'Edit': let obj = { target: { user: value.oldData._id } }
        data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('Edit', 'Users', null), eventType: 'Edit', eventTargetType: 'User', effectedData: value }, obj);
        break;

      case 'Search': data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('Search', 'Users', value), eventType: 'Search', eventTargetType: 'User' });
        break;

      case 'Delete': let delobj = { target: { user: value._id } }
        data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('Delete', 'User', value), eventType: 'Delete', eventTargetType: 'User' }, delobj);
        break;

      case 'Disable': let disobj = { target: { user: value._id } }
        data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('Disable', 'User', value), eventType: 'Disable', eventTargetType: 'User' }, disobj);
        break;

      case 'View': let viewobj = { target: { user: value._id } }
        data = Object.assign({}, this.CS.defaultObj, { name: this.CS.getMessage('View', 'Users', value), eventType: 'View', eventTargetType: 'User' }, viewobj);
        break;
      default: data = {};
        break;
    }
    console.log(data);
    
    this.CS.saveActivity(data).subscribe((res) => {
      if (res.status) {
        console.log(`${type} log saved`);
      } else {
        console.log('Unable to save log');
      }
    })
  }
  selected(value) {
    this.CS.selectd_page = value;
  }
}
