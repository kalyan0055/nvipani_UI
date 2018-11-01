import { Routes, RouterModule } from '@angular/router'; // common/login/userlogin.component
import { UserloginComponent } from '../../login/userlogin.component';
import { AuthGuard } from '../../common/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from '../../profile/profile.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UsersComponent } from 'src/app/adminusers/users.component';
 

const routes: Routes = [
  {
    path: '', component: UserloginComponent
  },
  {
    path: 'login', component: UserloginComponent
  },
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'users', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: 'src/app/ui-settings/settings.module#SettingsModule', canActivate: [AuthGuard] },
  { path: 'activities', loadChildren: 'src/app/user-activities/user-activities.module#UserActivitiesModule', canActivate: [AuthGuard] },
  
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'hsn', loadChildren: 'src/app/hsncodes/hsncodes.module#HsncodesModule', canActivate: [AuthGuard]
  },

  { path: 'confirm', loadChildren: 'src/app/email-auth/email-auth.module#EmailAuthModule' },
  // { path: 'confirm/:id1/:id2/:id3', loadChildren: 'src/app/email-auth/email-auth.module#EmailAuthModule' },
  
  { path: 'reset/:id1/:id2/:id3', loadChildren: 'src/app/resetpassword/resetpassword.module#ResetpasswordModule' },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'users', pathMatch: 'full' }


]

export const totRoutes: ModuleWithProviders = RouterModule.forRoot(routes)
