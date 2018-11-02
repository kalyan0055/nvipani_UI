import { Component, OnInit, ViewEncapsulation, ViewChild, Injector, OnDestroy } from '@angular/core';
import {
  FormGroup, FormBuilder, NgModel,
} from '@angular/forms';
import { Subject } from 'rxjs';
import * as jquery from 'jquery';
import * as _ from 'underscore';
import { AllServices } from '../allservices';
import { DataTableDirective } from 'angular-datatables';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

declare var $: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserActivitiesComponent extends AllServices implements OnInit, OnDestroy {
  usertype: string;

  tableData: any = [];
  delete_Data: any = null;
  update_data: any = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pagelength;
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  selected_type = 'All';

  selectedItems = [];
  dropdownSettings = {};
  // addmore:FormGroup;
  events = [{ id: 'Add', itemName: 'Add' }, { id: 'Accessed', itemName: 'Accessed' }, { id: 'Delete', itemName: 'Delete' }, { id: 'Disable', itemName: 'Disable' }, { id: 'Edit', itemName: 'Edit' }, { id: 'LogOut', itemName: 'LogOut' }, { id: 'Login', itemName: 'Login' }, { id: 'Search', itemName: 'Search' }, { id: 'View', itemName: 'View' }];

  constructor(public fb: FormBuilder, injector: Injector) {
    super(injector);
    this.usertype = localStorage.getItem('usertype');

  }
  dataTablesParameters: any;
  ngOnInit() {
    this.dataTablesParameters = null
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
      lengthMenu: [10, 20, 50, 100],
      "order": [[0, "desc"]],
      "autoWidth": false,
      //  lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.UAS.getActivities(dataTablesParameters).subscribe(resp => {
          let filteredData = [];
          let filteredData1 = [];
          let i = 1;
          resp.data.forEach(element => {
            element['options'] = '-';
            filteredData.push(element)
          });
          this.tableData = filteredData
          //  this.tabaleData = filteredData
          resp.totData.forEach(element => {
            element['options'] = '-';
            filteredData1.push(element)
          });
          callback({
            recordsTotal: this.tableData.length,
            recordsFiltered: resp.tot_count,
            data: filteredData1
          });
          //  this.reloadTable1();
        });
      },

      // initComplete: function () {
      //   console.log('test', ++this.i);

      //   this.api().columns([1, 2, 4]).every(function () {
      //     var column = this;
      //     var select = $('<select><option value="">--Select--</option></select>')
      //       .appendTo($(column.header()).empty())
      //       .on('change', function () {
      //         var val = $.fn.dataTable.util.escapeRegex(
      //           $(this).val()
      //         );
      //         column.search(val ? val : '', true, false).draw();
      //       });
      //     column.data().unique().sort().each(function (d, j) {
      //       select.append('<option value="' + d + '">' + d + '</option>')
      //     });
      //   });
      // },
      //   drawCallback: function( settings ) {
      //     // var api = this.api();

      //     // Output the data for the visible rows to the browser's console
      //     // console.log( api.rows( {page:'current'} ).data() );
      //     this.api().columns([0, 1, 3]).every(function () {
      //       var column = this;
      //       var select = $('<select><option value="">--Select--</option></select>')
      //         .appendTo($(column.footer()).empty())
      //         .on('change', function () {
      //           var val = $.fn.dataTable.util.escapeRegex(
      //             $(this).val()
      //           );
      //           column.search(val ? val : '', true, false).draw(1);
      //         });
      //       column.data().unique().sort().each(function (d, j) {
      //         select.append('<option value="' + d + '">' + d + '</option>')
      //       });
      //     });
      // },
        columns: [{ name: '_id', data: '_id' }, { title: 'Event', name: 'eventType', data: 'eventType' }, { title: 'Target Type', name: 'eventTargetType', data: 'eventTargetType' }, { title: 'Action', name: 'name', data: 'name' }, { title: 'By', name: 'user.username', data: 'user.username' }, { title: 'Options', name: 'options', data: 'options', orderable: false }]

    };

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Events",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  selected(value) {
    this.CS.selectd_page = value;
  }
  relaodTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });

  }

  resetdata() {
    this.relaodTable();
    this.delete_Data = null;
    this.update_data = null;
    this.getUI_Settings();
  }


  // delete(t) {
  //   this.UAS.getActivitiesd).subscribe((Res) => {
  //     if (Res.status) {
  //       localStorage.removeItem('datatable');
  //       this.US.datatable = [];
  //       this.UAS.getActivitiesleted', Res.message);
  //       this.commonFunction();
  //     } else {
  //       this.UAS.getActivitiesror', Res.message);
  //     }
  //   })
  // }



  commonFunction(type: any = '', msg: any = '') {
    this.resetdata();
    //  this.toasterMessages(type, msg);
    // this.getSettings();
    // this.US.getUI_Settings();
  }


  getUI_Settings() {
    this.US.getUI_Settings().subscribe((res) => {
      console.log(res.data);

      let data = res.data.filter(item => item.deleted === false);
      let s = _.where(data, { ui_table: "Activities" });
      if (s.length > 0) {
        let t = s[0]['records_per_page'];
        var array = JSON.parse("[" + t + "]");
        // this.datatable = [];
        this.US.datatable = [];
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          // this.datatable.push(element)
          this.US.datatable.push(element)
        }
        // localStorage.setItem('datatable', JSON.stringify(this.datatable));
      }
    })

  }

  search = false;
  filterUsers(type) {
    console.log(type.value, 'tess');
    this.search = type.value.includes('All')

    if (this.search) {
    }

  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.getActivitiesByType(null, this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    // console.log(this.selectedItems);
    this.getActivitiesByType(null, this.selectedItems)
  }
  onSelectAll(items: any) {
    // console.log(items);
    this.getActivitiesByType(null, items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  getActivitiesByType(eventType, types) {
    console.log(eventType, 'first param');

    if (types == 'Reset') {
      this.relaodTable();
    }
    let value = _.pluck(types, 'id');;
    value = _.compact(value);
    console.log(value, 'after extract values');
    if (value.length > 0) {
      this.UAS.getActivitiesByType({ types: value }).subscribe((res) => {
        if (res.status) {
          this.tableData = res.data;
        } else {

        }
      })
    }
    else if (types) {
      let prop = eventType;
      let value = [types];
      let obj = {};
      obj[`${prop}`] = value;
      this.UAS.getActivitiesByType(obj).subscribe((res) => {
        if (res.status) {
          this.tableData = res.data;
        } else {

        }
      })
    }
    else {
      this.relaodTable();
    }
  }


  EventType: any[];
  EventTargetType: any[];
  UserData: any[];
  getUniqColVal(type: string) {
    console.log(type);

    this.UAS.getUniqColVal(type).subscribe((types) => {
      switch (type) {
        case 'eventType': this.EventType = types.data;
          this.EventType.unshift('Reset')
          break;
        case 'eventTargetType': this.EventTargetType = types.data;
          this.EventTargetType.unshift('Reset')
          break;
        case 'user': this.UserData = types.data;
          this.UserData.unshift('Reset')
          break;
        default:
          break;
      }
    })
  }


}

