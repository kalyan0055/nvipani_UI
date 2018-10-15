// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Subject, pipe } from 'rxjs';
// operators all come from `rxjs/operators`
import { map } from 'rxjs/operators';
import { Url } from "./common/url";
import * as _ from 'underscore';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  reg_user = [];
  userlogin = false;
  userdata;
  public datatable = [];
  datatable1: any = []
  public data = [];
  //   simpleObservable = new Observable((observer) => {

  //     // observable execution
  //     observer.next("bla bla bla")
  //     this.getUI_Settings();
  //     observer.complete()
  // });

  // subscribe to the observable

  constructor(public _http: Http) {
    // this.getUI_Settings();

    //   const simpleObservable = new Observable((observer) => {

    //     // observable execution
    //     observer.next("bla bla bla")

    //     let body = {};

    //     const headers = new Headers({ 'Content-Type': 'application/json' });
    //     headers.append('Accept', 'application/json');

    //     headers.append('Access-Control-Allow-Origin', 'http://192.168.0.110:8081');
    //     headers.append('Access-Control-Allow-Credentials', 'true');
    //     if (localStorage.getItem('token')) {
    //       headers.append(
    //         'token', localStorage.getItem('token')
    //       );
    //     }
    //     const options = new RequestOptions({ headers: headers });
    //     this._http.get(Url.API.GET_UI_Settings + '/' + localStorage.getItem('userid'), 'get').pipe(map((res: Response) =>
    //       res.json())).subscribe((res) => {
    //       let data = res.data.filter(item => item.deleted === false);
    //       let s = _.where(data, { ui_table: "USERS" });
    //       if(s.length > 0){
    //         let t = s[0]['records_per_page'];
    //         var array = JSON.parse("[" + t+ "]");
    //         this.datatable = [];
    //         for (let i = 0; i < array.length; i++) {
    //           const element = array[i];
    //           this.datatable.push(element)
    //         }
    //          localStorage.setItem('datatable', JSON.stringify(this.datatable));
    //       }


    //     })
    //     observer.complete();
    // })

    // // subscribe to the observable
    // simpleObservable.subscribe()


  }




  getNewUsers(paging: any) {

    let pageSize: number = 0;
    let skip: number = 0;
    let totalRecordstoSend: number = 0;
    var draw = 0;
    var sortColumn = "";
    var sortColumnDir = "asc";
    var searchValue = "";
    let id: any;
    if (paging != null) {
      //Datatable parameter
      draw = paging.draw;

      //paging parameter
      var start = paging.start;
      var length = paging.length;
      // sorting parameter
      //sortColumn = paging.order[0].column;
      var tempSortColumn = paging.order[0].column;
      sortColumn = paging.columns[tempSortColumn].name;

      sortColumnDir = paging.order[0].dir;

      //filter parameter
      searchValue = paging.search.value;

      pageSize = length;//length != null ? Convert.To2(length) : 0;
      skip = start; //start != null ? Convert.To2(start) : 0;
      id = localStorage.getItem('userid');

    }


    let body = paging
    var data = this.callApi(Url.API.newUsersist + '/' + localStorage.getItem('userid'), 'post', body);
    //var users = {draw:draw,recordsFiltered:10};

    return data;
  }

  AddUserInfo(value) {
    return this.callApi(Url.API.USER_INFO, 'post', value)
  }

  delete_User(_id) {
    let body = {}
    return this.callApi(Url.API.DELETE_USER + '/' + _id, 'delete', body)
  }

  restore(_id) {
    let body = {}
    return this.callApi(Url.API.ACTIVATE_USER + '/' + _id, 'delete', body)
  }

  regViaemail(arg0: any): any {
    return this.callApi(Url.API.regViaemail, 'post', arg0)
  }

  fileupload(value) {
    return this.callApi(Url.API.FILE_UPLOAD, 'post', value)
  }

  sendPasswordLink(value): any {
    return this.callApi(Url.API.SENDPASSWORDLINK, 'post', value)
  }

  disable_User(_id, type) {
    let body = { id: _id, type: type }
    return this.callApi(Url.API.DISABLE_USER, 'post', body)
  }


  findUser(value) {
    return this.callApi(Url.API.FINDUSER, 'post', value)
  }

  // getUI_Settings() {
  //   let body = {};

  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Accept', 'application/json');

  //   headers.append('Access-Control-Allow-Origin', 'http://192.168.0.110:8081');
  //   headers.append('Access-Control-Allow-Credentials', 'true');
  //   if (localStorage.getItem('token')) {
  //     headers.append(
  //       'token', localStorage.getItem('token')
  //     );
  //   }
  //   const options = new RequestOptions({ headers: headers });
  //   this._http.get(Url.API.GET_UI_Settings + '/' + localStorage.getItem('userid'), 'get').pipe(map((res: Response) =>
  //     res.json())).subscribe((res) => {
  //     let data = res.data.filter(item => item.deleted === false);
  //     let s = _.where(data, { ui_table: "USERS" });
  //     if(s.length > 0){
  //       let t = s[0]['records_per_page'];
  //       var array = JSON.parse("[" + t+ "]");
  //       this.datatable = [];
  //       for (let i = 0; i < array.length; i++) {
  //         const element = array[i];
  //         this.datatable.push(element)
  //       }
  //        localStorage.setItem('datatable', JSON.stringify(this.datatable));
  //     }


  //   })
  // }
  getUI_Settings() {
    let body = {}
    return this.callApi(Url.API.GET_UI_Settings + '/' + localStorage.getItem('userid'), 'get', body);
  }



  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://192.168.0.110:8081');
    headers.append('Access-Control-Allow-Credentials', 'true');
    if (localStorage.getItem('token')) {
      headers.append(
        'token', localStorage.getItem('token')
      );
    }
    const options = new RequestOptions({ headers: headers });

    switch (method) {
      case 'post':
        return this._http
          .post(url, body, options)
          .pipe(map((res: Response) => res.json())).catch((err) => {
            // Do messaging anREd error handling here
            let empty = [];
            let res = JSON.parse(err._body)
            empty.push(res);
            return empty;
          });;
      case 'get':
        return this._http
          .get(url, options)
          .pipe(map((response: Response) => response.json())).catch((err) => {

            // Do messaging anREd error handling here
            let empty = [];
            let res = JSON.parse(err._body)
            empty.push(res);
            return empty;
          });
      case 'put':
        return this._http
          .put(url, body, options)
          .pipe(map((response: Response) => response.json())).catch((err) => {
            // Do messaging anREd error handling here
            let empty = [];
            let res = JSON.parse(err._body)
            empty.push(res);
            return empty;
          });;
      case 'delete':
        return this._http
          .delete(url, options)
          .pipe(map((response: Response) => response.json())).catch((err) => {

            // Do messaging anREd error handling here
            let empty = [];
            let res = JSON.parse(err._body)
            empty.push(res);
            return empty;
          });;
    }
  }
  ;
}
