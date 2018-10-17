 
import { Component, OnInit,Injector } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from "@angular/forms";
import { HsnService } from "../hsncodes/hsn.service";
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '../../../node_modules/angular-6-datatable';
// import {UomService} from '../unitofmeasuers/uom.service';
import {SelectItem} from 'primeng/api';
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
  selector: 'app-hsncodes',
  templateUrl: './hsncodes.component.html',
  styleUrls: ['./hsncodes.component.css']
})
export class HsncodesComponent extends AllServices implements OnInit {
  loading: boolean;
  tabaledata1;
  UOM_FORM: FormGroup;
  public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = '';
  public sortOrder = 'desc';
  types: any = [{ 'type': 'Simple' }, { 'type': 'Compound' }];
  totalposts:number;
  pageSize=100;
  currentpage=1;
  nvipani=false;
  disable_Data;
  reset_Data;
  //angular2-multiselect
    itemList = [];
  hsnUpdateId:string='';
  //
  uomData:any=[];
 //DATATABLE DATA
 dtOptions1: DataTables.Settings = {};
 persons = [];
 dtTrigger: Subject<any> = new Subject();
 pagelength;
 usertype;
              
  constructor(  private fb: FormBuilder,injector: Injector ) {
    super(injector)
   }


  ngOnInit() {
    // this.getNewUsers();
    // this.get_uoms();
    // this.get_hsns(this.pageSize,this.currentpage);
    this.usertype = localStorage.getItem('usertype');

    this.UOM_FORM = this.fb.group({
      name: [''],
      chapterCode:[''],
      chapterDescription: [''],
      headingCode: [''],
      headingDescription: [''],
      hsncode: [''],
      description: [''],
      unitOfMeasure: ['']
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
        this.HSN.get_hsns(dataTablesParameters).subscribe(resp => {
          let filteredData = [];
          let i = 1;
          resp.hsncodes.forEach(element => {
            element['options'] = '-';
            // element['sno'] = i++;
            filteredData.push(element)
          });
          this.tabaledata1 = filteredData
          //  this.tabaleData = filteredData
          callback({
            recordsTotal: this.tabaledata1.length,
            recordsFiltered: resp.count,
            data: []
          });

        });
      },

      columns: [  { title: 'Name', name: 'name', data: 'name' }, { title: 'Description', name: 'description', data: 'description' }, { title: 'HSN Code', name: 'hsncode', data: 'hsncode'},{title: 'Chapter Code', name: 'chapter code', data: 'chapterCode'},{ title: 'Options', name: 'options', data: 'options', orderable: false },
      ],

    };
  }

  // get_hsns(pageSize:number,currentpage:number) {
  //   this.loading = true;
  //   this.HSN.get_hsns(this.pageSize,this.currentpage).subscribe((res) => {
  //     console.log(res.count);
  //     this.tabaledata1 = res.hsncodes;
  //     this.totalposts = res.count;
  //     if (res) {
  //       this.loading = false;
  //     } else {
  //       this.loading = true;
  //     }
  //   })
  // }
 
  onChnagepage(pageData:PageEvent){
    this.currentpage = pageData['pageIndex']+1;
    this.pageSize = pageData['pageSize'];
    console.log(this.currentpage,this.pageSize);
    // this.get_hsns(this.pageSize,this.currentpage);
  }


  // get_uoms() {
  //   this.loading = true;
  //   this.UOM.get_uoms().subscribe((res) => {
  //     console.log(res);
  //     if (res) {
  //       this.itemList = res;
  //       this.loading = false;
  //     } else {
  //       this.itemList = [];
  //       this.loading = true;
  //     }
  //   })
  // }

  addHsn(){
    console.log(this.UOM_FORM.value);
    if(this.hsnUpdateId!=''){
      this.UpdateHsn()
    }else{
      this.HSN.addHSN(this.UOM_FORM.value).subscribe((res)=>{
        if(res.status){
            this.hsnUpdateId='';
            // this.get_hsns(this.pageSize,this.currentpage);
            this.toastr.success(res.messagge,'success');
        }else{

        }
      })
    }
     
  }

  editHSN(t){
    console.log(t);
    this.hsnUpdateId= t._id
    this.UOM_FORM.patchValue(t)
  }

  UpdateHsn(){
    let body = Object.assign({},this.UOM_FORM.value,{_id:this.hsnUpdateId})
    this.HSN.updateHSN(body).subscribe((res)=>{
      if(res.status){
          this.hsnUpdateId='';
          // this.get_hsns(this.pageSize,this.currentpage);
          this.toastr.success(res.messagge,'success');
      }else{
          this.toastr.warning(res.messagge,'Error');
      }
    }) 
  }

  delete_Data;
  delete(t) {
    this.HSN.delete_HSN(t._id).subscribe((res) => {
      console.log(res.data);
      if (res.status) {
        this.toastr.error('Successfully Deleted!', 'Thank you!');
        this.delete_Data='';
      } else {
          this.toastr.warning('Unable to delete', 'Error');
      }
    });
  }
  delete_popup(t) {
    console.log(t);
    this.delete_Data = t;
  }
   
}
