import { UisettingsService } from './ui-settings/uisettings.service';
import { UsersService } from './users.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { UploadService } from 'src/app/common/upload.service';
import { ProfileService } from './profile/profile.service';
import { AuthenticationService } from "./common/authentication.service";
import { Injector } from '@angular/core'
import { AutologoutService } from './common/autologout.service';
 
export abstract class AllServices {
  public UIS: UisettingsService;
  public US: UsersService;
  public toastr: ToastrService;
  public UploadService: UploadService
  public PS: ProfileService;
  public AUTOLOGOUT: AutologoutService;
  public Auth: AuthenticationService;

  constructor(injector: Injector) {
    this.UIS = injector.get(UisettingsService);
    this.US = injector.get(UsersService);
    this.toastr = injector.get(ToastrService);
    this.PS = injector.get(ProfileService);
    this.Auth = injector.get(AuthenticationService);
    this.AUTOLOGOUT = injector.get(AutologoutService);
  }
}
