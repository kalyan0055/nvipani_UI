import { environment } from "../../environments/environment";
export class Url {
    public static API = { 
        //USER Registration and Login
        SIGNIN:environment.url+'auth/signin',
        CONF_REGISTRATION:environment.url+'user/userRegistration',
        RESET_PASSWORD: environment.url + 'auth/reset',
        regViaemail :environment.url + 'user/userRegistration',
        SENDPASSWORDLINK :environment.url + 'users/resetPasswordRequest',
        
        
        newUsersist : environment.url+'users/newuserslist',
        DELETE_USER :environment.url +'users/deleteuser',
        ACTIVATE_USER:environment.url +'users/restoreeuser',
        FILE_UPLOAD : environment.url + 'fileupload',
        USER_INFO : environment.url + 'authentication/userinfo',
        USER_INFO_VIMAGE : environment.url + 'authentication/userinfo_vimage',
        USERINFO_UPDATE_VIMAGE :environment.url + 'authentication/userinfo_update_vimage',
        FINDUSER : environment.url + 'users/finduser',
        // regViaemail :environment.url + 'users/registervialink',
       
        DISABLE_USER: environment.url + 'users/disableUser',
      

        //PROFILE
        UPDATE_PROFILE : environment.url+'users/update',
        CHANGE_PROFILE : environment.url+'users/profilePicture',

        //UNIT OF MEASUREMENTS
        CREATE_UOM: environment.url + 'unitofmeasures',


        //HSN CODES
        HSN_CODES: environment.url + 'hsncodeslist',
        addHSN: environment.url + 'hsncodes',
        UPDATEHSN: environment.url + 'hsnupdate',
        DELETE_HSN : environment.url + 'hsndelete',
  

        //TAXGROUPS
        TAXGROUPS: environment.url + 'taxGroup',
        TAXGROUP_ADD: environment.url + 'taxGroup',
        TAXGROUP_UPDATE: environment.url + 'taxGroup',
        TAXGROUP_DELETE : environment.url + 'deleteTaxGroups',

        //CATEGORIES
        
        CREATE_MAIN_CATEGORY : environment.url+'createMainCategory',  //Create Main/Sub Categoires with file
        UPDATE_MAIN_CATEGORY:environment.url+'createMainCategory/update',
        MAIN_CATEGORIES_LIST : environment.url + 'createMainCategory',
        MAIN_CATEGORIES_DISABLE_ENABLE : environment.url + 'categories/disable',
        CREATE_SUB_CATEGORIES : environment.url+'createMainCategory', //Create Main/Sub Categoires without file
        UPDATE_SUB_CATEGORIES:environment.url+'createMainCategory/update',//Update Main/Sub Categoires without file
            //Sub Categories
        SUB_CATEGORIES1_LIST : environment.url + 'querySubCategories1',


        //UI SETTINGS
        SAVE_RECORDS_PER_PAGE :environment.url + 'settings_new',
        GET_UI_Settings:environment.url + 'settings_new',
        GET_UI_Settings_ajax:environment.url + 'settings_list',

        //SAVE ACTIVITY
        SAVE_ACTIVITY : environment.url +'saveActivity',
}   
}