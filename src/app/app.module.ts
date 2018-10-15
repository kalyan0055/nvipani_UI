
import { UserloginComponent } from './login/userlogin.component';
import { totRoutes } from './common/main-routing/main-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserIdleModule } from 'angular-user-idle';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { UploadService } from './common/upload.service';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'primeng/tooltip';
import { AuthGuard } from './common/auth.guard';
import { LoaderModule } from './common/loader.module';
import { CommonCommonModule } from './common/common.module';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
 

// import { UiSettingsComponent } from './ui-settings/ui-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
  
    ProfileComponent,
     
    // UiSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    UserIdleModule.forRoot({ idle: 30, timeout: 5, ping: 0 }),
    ToastrModule.forRoot(),
    totRoutes,
    LoaderModule,   //FOR COMPONENT LOADING
    CommonCommonModule, // FOR COMMON MODULES IMPORTED FROM ANGULAR, THIRD PARTIES
  ],
  providers: [UploadService, AuthGuard,ToastrService],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
