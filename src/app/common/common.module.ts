import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,

  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,

  MatStepperModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserIdleModule } from 'angular-user-idle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
// import {DataTableModule  } from "angular2-datatable";
import { DataTableModule } from "angular-6-datatable";
// import { ForgetPasswordComponent } from './common/forget-password/forget-password.component';
 
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrService } from 'ngx-toastr';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
 
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,

    DataTableModule,
    TooltipModule,
    DataTablesModule,
    AngularMultiSelectModule
     
  ],
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule, MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,

     
    DataTableModule,
    TooltipModule,
    DataTablesModule,
    AngularMultiSelectModule
    
  
   

  ],
  providers: [ToastrService]
})
export class CommonCommonModule { }
