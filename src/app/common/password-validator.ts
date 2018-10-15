import { FormGroup } from '@angular/forms';

export class RegistrationValidator {
    static validate(registrationFormGroup: FormGroup) {
        let password = registrationFormGroup.controls.password.value;
        let repeatPassword = registrationFormGroup.controls.repeatPassword.value;
      
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        let test = re.test(password);
        if(!test){
            return {
                passwordContain: true
            }
        }
        if (password.length <= 7) {
            return null;
        }
        if (repeatPassword.length <= 0) {
            return null;
        }

        if (repeatPassword !== password) {
            return {
                doesMatchPassword: true
            };
        }
      
        return null;

    }
}