import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { UserloginComponent } from './userlogin.component';
import { HeaderComponent } from '../common/header/header.component';
import { SidenavComponent } from '../common/sidenav/sidenav.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { AuthenticationService } from "../common/authentication.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

xdescribe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,SidenavComponent,UserloginComponent ],
      providers:[AuthenticationService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it(`should create`, async(inject([HttpTestingController, AuthenticationService],
    (httpClient: HttpTestingController, AuthenticationService: AuthenticationService) => {
      expect(AuthenticationService).toBeTruthy();
  })));

});
